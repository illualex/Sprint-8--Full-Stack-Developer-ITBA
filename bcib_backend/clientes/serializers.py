from rest_framework import serializers
from .models import Cliente, Cuenta, Direccion, AuthUser, Prestamo, Tarjeta, TipoTarjeta, Sucursal

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('email',)

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = '__all__'

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    direccion = DireccionSerializer(source='direccion_set', many=True)
    user = AuthUserSerializer()
    branch = SucursalSerializer()
    class Meta:
        model = Cliente
        fields = '__all__'

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = ['balance', 'numero_cuenta']

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Prestamo
        fields = '__all__'

class TipoTarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoTarjeta
        fields = '__all__'

class TarjetaSerializer(serializers.ModelSerializer):
    tipo_tarjeta = TipoTarjetaSerializer()
    class Meta:
        model = Tarjeta
        fields = '__all__'