from django.urls import path
from .views import SucursalListView, PrestamosPorSucursalView

urlpatterns = [
    path('listado/', SucursalListView.as_view(), name='listado'),
    path('prestamos/<int:branch_id>/', PrestamosPorSucursalView.as_view(), name='prestamos-por-sucursal'),
]
