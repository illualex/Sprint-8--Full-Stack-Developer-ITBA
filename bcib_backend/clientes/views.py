from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cliente, Cuenta, Direccion, Tarjeta, Prestamo
from .serializers import ClienteSerializer, CuentaSerializer, DireccionSerializer, BalanceSerializer, PrestamoSerializer, TarjetaSerializer

class ClienteView(APIView):
    permission_classes = [IsAuthenticated]

    @api_view(['GET'])
    def obtener_datos_cliente(request, customer_id, *args, **kwargs):
        cliente = Cliente.objects.get(customer_id=customer_id)
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data, status=200)

    def obtener_saldo_cuenta(self, request, *args, **kwargs):
        cuenta = Cuenta.objects.get(customer=request.user.cliente)
        serializer = CuentaSerializer(cuenta)
        return Response(serializer.data, status=200)

    @api_view(['POST'])
    def guardar_prestamo(request, *args, **kwargs):
        prestamo = PrestamoSerializer(data = request.data)
        if prestamo.is_valid():
            prestamo.save()
            cliente = Cliente.objects.get(customer_id=request.data['customer_id'])
            cuenta = Cuenta.objects.get(customer=cliente)
            cuenta.balance += request.data['loan_total']
            cuenta.save()
            return Response(prestamo.data, status=200)
        return Response(prestamo.errors, status=400)

    @api_view(['POST'])
    def modificar_direccion_cliente(request, *args, **kwargs):
        direccion_id = request.data.get('id')
        try:
            direccion = Direccion.objects.get(pk=direccion_id)
        except Direccion.DoesNotExist:
            return Response({'error': 'La dirección no existe'}, status=400)
        serializer = DireccionSerializer(instance=direccion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
    @api_view(['GET'])
    def obtener_balance(request, customer_id, *args, **kwargs):
        user = request.user
        try:
            cliente = Cliente.objects.get(customer_id=customer_id)
            cuenta = Cuenta.objects.get(customer=cliente)
            serializer = BalanceSerializer(cuenta)
            return Response({'balance': serializer.data['balance'], 'numero_cuenta': serializer.data['numero_cuenta']})
        except Cuenta.DoesNotExist:
            return Response({'error': 'Cuenta no encontrada'}, status=404)
        
    @api_view(['GET'])
    def obtener_cliente_por_dni(request, dni):
        try:
            cliente = Cliente.objects.get(customer_dni=dni)
            serializer = ClienteSerializer(cliente)
            return Response(serializer.data, status=200)
        except Cliente.DoesNotExist:
            return Response({'message': 'Cliente no encontrado'}, status=404)

    @api_view(['GET'])    
    def obtener_tarjetas(request, customer_id, *args, **kwargs):
        try:
            tarjetas = Tarjeta.objects.filter(customer_id=customer_id)
            serializer = TarjetaSerializer(tarjetas, many=True)
            return Response(serializer.data, status=200)
        except Tarjeta.DoesNotExist:
            return Response({'message': 'Tarjetas not found for the customer'}, status=404)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    @api_view(['GET'])
    def obtener_prestamos_cliente(request, customer_id, *args, **kwargs):
        try:
            prestamos = Prestamo.objects.filter(customer_id=customer_id)
            serializer = PrestamoSerializer(prestamos, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
    @api_view(['DELETE'])
    def anular_prestamo(request, loan_id):
        try:
            prestamo = Prestamo.objects.get(loan_id=loan_id)
            print(prestamo)
            cuenta = Cuenta.objects.get(customer=prestamo.customer_id)
            cuenta.balance -= prestamo.loan_total
            cuenta.save()
            prestamo.delete()
            return Response({'message': 'Préstamo anulado correctamente'})
        except Exception as e:
            return Response({'error': str(e)}, status=500)