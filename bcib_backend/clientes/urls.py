from django.urls import path
from .views import ClienteView

urlpatterns = [
    path('obtener-datos-cliente/<int:customer_id>/', ClienteView.obtener_datos_cliente, name='obtener_datos_cliente'),
    path('obtener-saldo-cuenta/', ClienteView.as_view(), name='obtener_saldo_cuenta'),
    path('guardar-prestamo/', ClienteView.guardar_prestamo, name='guardar_prestamo'),
    path('modificar-direccion-cliente/', ClienteView.modificar_direccion_cliente, name='modificar_direccion_cliente'),
    path('obtener-balance/<int:customer_id>/', ClienteView.obtener_balance, name='obtener_balance'),
    path('buscar-por-dni/<str:dni>/',ClienteView.obtener_cliente_por_dni, name='obtener_cliente_por_dni'),
    path('obtener-tarjetas/<int:customer_id>/', ClienteView.obtener_tarjetas, name='obtener_tarjetas'),
    path('prestamos/<int:customer_id>/', ClienteView.obtener_prestamos_cliente, name='obtener_prestamos_cliente'),
    path('anular-prestamo/<int:loan_id>/', ClienteView.anular_prestamo, name='anular_prestamo'),
]