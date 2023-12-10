from rest_framework import serializers
from .models import Sucursal, Prestamo, Cliente

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    customer = ClienteSerializer()

    class Meta:
        model = Prestamo
        fields = '__all__'