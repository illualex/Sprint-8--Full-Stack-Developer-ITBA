from django.urls import path
from .views import TarjetasView

urlpatterns = [
    path('obtener-tarjetas/', TarjetasView.as_view(), name='obtener_tarjetas'),
]
