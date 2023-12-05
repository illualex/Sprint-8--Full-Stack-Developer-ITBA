# login/views.py
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Cliente, AuthUser
from .serializers import ClienteSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    
    # Obtener el usuario personalizado
    auth_user = get_object_or_404(AuthUser, username=username, password=password)
    
    # Obtener el cliente relacionado
    try:
        cliente = Cliente.objects.get(user=auth_user)
    except Cliente.DoesNotExist:
        cliente = None

    if cliente is not None:
        serializer = ClienteSerializer(cliente)
        # Puedes realizar otras acciones, como generar y devolver un token de autenticación si es necesario
        return Response({'message': 'Login successful', 'cliente': serializer.data})
    else:
        return Response({'message': 'Cliente not found for the authenticated user'}, status=404)
