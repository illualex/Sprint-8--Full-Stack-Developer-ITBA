from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Sucursal, Prestamo
from .serializers import SucursalSerializer, PrestamoSerializer
from rest_framework.permissions import IsAuthenticated

class SucursalListView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request, *args, **kwargs):
        sucursales = Sucursal.objects.all()
        serializer = SucursalSerializer(sucursales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PrestamosPorSucursalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, branch_id, *args, **kwargs):
        try:
            sucursal = Sucursal.objects.get(branch_id=branch_id)
            prestamos = Prestamo.objects.filter(branch=sucursal)
            serializer = PrestamoSerializer(prestamos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Sucursal.DoesNotExist:
            return Response({'message': 'Sucursal no encontrada'}, status=status.HTTP_404_NOT_FOUND)

