from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Prestamo, Tarjeta, Direccion
from .serializers import PrestamoSerializer, TarjetaSerializer, DireccionSerializer

class EmpleadoView(APIView):
    permission_classes = [IsAuthenticated]

    def obtener_monto_prestamos_sucursal(self, request, branch_id, *args, **kwargs):
        prestamos = Prestamo.objects.filter(branch_id=branch_id)
        serializer = PrestamoSerializer(prestamos, many=True)
        monto_total = sum([prestamo.loan_total for prestamo in prestamos])
        return Response({'monto_total': monto_total}, status=200)

    def obtener_tarjetas_cliente(self, request, customer_id, *args, **kwargs):
        tarjetas = Tarjeta.objects.filter(customer_id=customer_id)
        serializer = TarjetaSerializer(tarjetas, many=True)
        return Response(serializer.data, status=200)

    def generar_solicitud_prestamo(self, request, *args, **kwargs):
        serializer = PrestamoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def anular_solicitud_prestamo(self, request, loan_id, *args, **kwargs):
        try:
            prestamo = Prestamo.objects.get(loan_id=loan_id)
            prestamo.delete()
            return Response(status=204)
        except Prestamo.DoesNotExist:
            return Response({'error': 'El préstamo no existe'}, status=404)

    def modificar_direccion_cliente(self, request, customer_id, *args, **kwargs):
        try:
            direccion = Direccion.objects.get(customer_id=customer_id)
        except Direccion.DoesNotExist:
            return Response({'error': 'La dirección no existe'}, status=404)

        serializer = DireccionSerializer(direccion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
