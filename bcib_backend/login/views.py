from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Cliente, AuthUser, Empleado
from .serializers import ClienteSerializer, EmpleadoSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        isEmployee= request.data.get('isEmployee')
        print("es empleado", isEmployee)
        auth_user = authenticate(request, username=username, password=password)

        if auth_user is not None:
            token, created = Token.objects.get_or_create(user=auth_user)

            if isEmployee:
                try:
                    empleado = Empleado.objects.get(user=auth_user)
                    serializer = EmpleadoSerializer(empleado)
                    return Response({'message': 'Login successful', 'empleado': serializer.data, 'token': token.key})
                except Empleado.DoesNotExist:
                    return Response({'message': 'Empleado not found for the authenticated user'}, status=status.HTTP_404_NOT_FOUND)
            else:
                try:
                    cliente = Cliente.objects.get(user=auth_user)
                    serializer = ClienteSerializer(cliente)
                    return Response({'message': 'Login successful', 'cliente': serializer.data, 'token': token.key})
                except Cliente.DoesNotExist:
                    return Response({'message': 'Cliente not found for the authenticated user'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)