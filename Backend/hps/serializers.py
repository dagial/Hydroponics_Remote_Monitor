from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *

User = get_user_model()


class UsersCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ["name", "f_name", "phone_number", "email", "password"]


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"




class BlogSerializer(ModelSerializer):
    date = serializers.CharField(source="get_date",read_only=True)

    class Meta:
        model = Blog
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "f_name", "email", "phone_number", "id", "is_admin"]


class OrdersSerializer(ModelSerializer):
    class Meta:
        model = Orders
        exclude = ["date"]


class OrderedProductSerializer(ModelSerializer):
    class Meta:
        model = OrderedProduct
        exclude = ["order"]


class Ord(ModelSerializer):
    ordered_product = ProductSerializer()

    class Meta:
        model = OrderedProduct
        fields = ["ordered_product", "quantity"]


class OrdOrders(ModelSerializer):
    user = UserSerializer()
    orders = Ord(many=True)

    class Meta:
        model = Orders
        fields = "__all__"


class FaqSerializer(ModelSerializer):

    class Meta:
        model = Faq
        fields="__all__"


class ParameterSerializer(ModelSerializer):
    str_max_temp=serializers.CharField(source="get_max_temp_str",read_only=True)
    str_min_temp=serializers.CharField(source="get_min_temp_str",read_only=True)
    class Meta:
        model = Parameters
        fields = "__all__"
