from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.mail import send_mail
from django.utils import timezone
import datetime
from datetime import timedelta

iso_date = "2021-02-01"
default_date = datetime.datetime.fromisoformat(iso_date)


class UserManager(BaseUserManager):
    def create_user(self, name, f_name, email, phone_number, password=None):
        user = self.model(name=name, f_name=f_name, email=email, phone_number=phone_number)
        user.is_staff = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, f_name, email, phone_number, password):
        user = self.create_user(name=name, f_name=f_name, email=email, phone_number=phone_number, password=password)
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    name = models.CharField(max_length=50)
    f_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = PhoneNumberField()
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["name", "f_name", "phone_number"]

    objects = UserManager()

    def __str__(self):
        return self.name + self.f_name

    def has_perm(self, perm, objects=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


CATEGORY_CHOICES = [("agriculture", "agriculture"), ("hydroponics", "hydroponics")]


class Products(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default="hydroponics")
    price = models.IntegerField()
    description = models.TextField()
    product_image = models.ImageField(upload_to="products")
    date = models.DateTimeField(auto_now_add=True)


class Blog(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="newsFeed")
    date = models.DateTimeField(auto_now_add=True)

    def get_date(self):
        return self.date.date()



class Orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    city = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    delivery_date = models.DateField(null=True)

    def save(self,*args,**kwargs):

        if self.delivery_date:
            message = f"dear {self.user.name} {self.user.f_name}\n your Order " \
                      f"will be delivered at your address {self.city} {self.address} on  " \
                      f"{self.delivery_date}"
            send_mail("Product Delivery",message,"dagiakek@gmail.com",[self.user.email],)
        return super().save(*args,**kwargs)

class OrderedProduct(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name="orders")
    ordered_product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name="product")
    quantity = models.IntegerField()


class Faq(models.Model):
    question = models.TextField()
    answer = models.TextField(null=True)
    date = models.DateField(auto_now_add=True)


class Parameters(models.Model):
    name=models.CharField(max_length=250)
    max_temp=models.IntegerField()
    min_temp=models.IntegerField()

    def get_max_temp_str(self):
        return str(self.max_temp)
    def get_min_temp_str(self):
        return str(self.min_temp)