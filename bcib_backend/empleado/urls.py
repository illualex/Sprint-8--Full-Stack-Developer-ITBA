from django.urls import path
from .views import EmpleadoView

urlpatterns = [
    path('obtener-monto-prestamos-sucursal/<int:branch_id>/', EmpleadoView.as_view(), name='obtener_monto_prestamos_sucursal'),
    path('obtener-tarjetas-cliente/<int:customer_id>/', EmpleadoView.as_view(), name='obtener_tarjetas_cliente'),
    path('generar-solicitud-prestamo/', EmpleadoView.as_view(), name='generar_solicitud_prestamo'),
    path('anular-solicitud-prestamo/<int:loan_id>/', EmpleadoView.as_view(), name='anular_solicitud_prestamo'),
    path('modificar-direccion-cliente/<int:customer_id>/', EmpleadoView.as_view(), name='modificar_direccion_cliente'),
]