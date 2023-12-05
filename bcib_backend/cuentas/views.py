# cuenta/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CuentaSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_balance(request):
    user = request.user
    try:
        cuenta = Cuenta.objects.get(customer__user=user)
        serializer = CuentaSerializer(cuenta)
        return Response({'balance': serializer.data['balance']})
    except Cuenta.DoesNotExist:
        return Response({'error': 'Cuenta no encontrada'}, status=404)
