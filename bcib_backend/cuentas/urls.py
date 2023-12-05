# cuenta/urls.py
from django.urls import path
from .views import obtener_balance

urlpatterns = [
    path('api/obtener-balance/', obtener_balance, name='obtener_balance'),
]
