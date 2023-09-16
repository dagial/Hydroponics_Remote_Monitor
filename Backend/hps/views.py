from rest_framework.viewsets import GenericViewSet, ModelViewSet, ReadOnlyModelViewSet
from rest_framework.generics import ListAPIView, CreateAPIView,RetrieveAPIView
from rest_framework import permissions
from .serializers import *
from .models import Products, Blog
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.filters import SearchFilter
from django.db.models import Q
from .arduino import ard
import serial
import time
User = get_user_model()


class AdminViewProduct(ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


class AdminView(ModelViewSet):
    def update_type(self):
        return self.request.query_params.get("update_type")

    def get_queryset(self):
        update_type = self.update_type()
        if update_type == "blog":
            return Blog.objects.all()
        if update_type == "product":
            return Products.objects.all()

    def get_serializer_class(self):
        update_type = self.update_type()
        if update_type == "blog":
            return BlogSerializer
        if update_type == "product":
            return ProductSerializer


class PermissionPolicyMixin:
    def check_permissions(self, request):
        try:
            # This line is heavily inspired from `APIView.dispatch`.
            # It returns the method associated with an endpoint.
            handler = getattr(self, request.method.lower())
        except AttributeError:
            handler = None

        if (
                handler
                and self.permission_classes_per_method
                and self.permission_classes_per_method.get(handler.__name__)
        ):
            self.permission_classes = self.permission_classes_per_method.get(handler.__name__)

        super().check_permissions(request)

#
# class AdminViewHelp(ModelViewSet):
#     queryset = HelpCenter.objects.all()
#     serializer = HelpCenterSerializer
#
#
# class AdminViewRepository(ModelViewSet):
#     queryset = Repository.objects.all()
#     serializer = RepositorySerializer
#
#
# class HelpCenterViewSet(ReadOnlyModelViewSet):
#     queryset = HelpCenter.objects.all()
#     serializer = HelpCenterSerializer


class ProductsView(ModelViewSet):
    queryset = Products.objects.all().order_by("-date")
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class BlogView(PermissionPolicyMixin, ModelViewSet):
    queryset = Blog.objects.all().order_by("-date")
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_per_method = {
        "create": [permissions.IsAuthenticated, permissions.IsAdminUser],
        "list":[permissions.AllowAny],
    }

    def get_queryset(self):
        page=self.request.query_params.get("page")
        if page=="home" and self.action=="list":
            return Blog.objects.all().order_by("-date")[:3]
        return Blog.objects.all().order_by("-date")


class OrdersView(ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data["order"])
        serializer.is_valid(raise_exception=True)
        serializer.save()
        for item in request.data["items"]:
            item_serializer = OrderedProductSerializer(data=item)
            item_serializer.is_valid(raise_exception=True)
            item_serializer.save(order=serializer.instance)
        return Response(serializer.data, status=HTTP_201_CREATED)


class CustomSearchFilter(SearchFilter):
    def get_search_fields(self, view, request):
        search_from = request.query_params.get("search_from")
        if search_from == "blog":
            return ["title"]
        if search_from == "product":
            return ["name", "category", "description"]


class SearchView(ListAPIView):
    filter_backends = [CustomSearchFilter]
    permission_classes=[permissions.AllowAny]

    def get_search_from(self):
        return self.request.query_params.get("search_from")

    def get_queryset(self):
        search_from = self.get_search_from()
        filter_by=self.request.query_params.get("filter_by") or None

        if search_from == "blog":
            return Blog.objects.all()
        if search_from == "product":
            if filter_by:
                return Products.objects.filter(category=filter_by)
            return Products.objects.all()

    def get_serializer_class(self):
        search_from = self.get_search_from()
        if search_from == "blog":
            return BlogSerializer
        if search_from == "product":
            return ProductSerializer


class OrderTest(ListAPIView):
    queryset=Orders.objects.filter(delivery_date=None).order_by("-date")
    serializer_class = OrdOrders


class FaqView(ModelViewSet):
    serializer_class=FaqSerializer
    permission_classes = [permissions.AllowAny,]

    def get_queryset(self):
        get_type=self.request.query_params.get("type")
        if self.action== "list":
            if get_type=="q":
                return Faq.objects.filter(answer=None).order_by("-date")
            return Faq.objects.filter(~Q(answer=None)).order_by("-date")
        return Faq.objects.all()


class StatusView(ModelViewSet):
    serializer_class= ParameterSerializer
    queryset = Parameters.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,*args,**kwargs):
        instance=self.get_object()
        serializer=self.get_serializer(instance)
        # arduino = serial.Serial(port='COM4', baudrate=9600, timeout=None, bytesize=8, parity='N')

        print(serializer.data)
        msg = serializer.data["str_max_temp"]
        msg2 = serializer.data["str_min_temp"]
        val=ard(msg,msg2)

        return Response(val)


