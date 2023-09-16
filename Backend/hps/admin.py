from django.contrib import admin
from .models import *

admin.site.register(Products)
admin.site.register(Blog)
admin.site.register(OrderedProduct)
admin.site.register(User)

