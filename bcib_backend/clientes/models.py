from django.contrib.auth.models import AbstractBaseUser
from django.db import models

class AuthUser(AbstractBaseUser):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    first_name = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_user'

class TipoCliente(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.TextField(db_column='Nombre')

    class Meta:
        managed = False
        db_table = 'tipo_cliente'

class Sucursal(models.Model):
    branch_id = models.AutoField(primary_key=True)
    branch_number = models.BinaryField()
    branch_name = models.TextField()
    branch_address_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'sucursal'

class Cliente(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.TextField()
    customer_surname = models.TextField()
    customer_dni = models.TextField(db_column='customer_DNI')
    dob = models.TextField(blank=True, null=True)
    branch = models.ForeignKey(Sucursal, models.DO_NOTHING, blank=True, null=True)
    tipo_cliente = models.ForeignKey(TipoCliente, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)
    telefono = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cliente'

class Direccion(models.Model):
    id = models.AutoField(primary_key=True)
    calle = models.TextField(blank=True, null=True)
    numero = models.TextField(blank=True, null=True)
    localidad = models.TextField(blank=True, null=True)
    provincia = models.TextField(blank=True, null=True)
    codigo_postal = models.TextField(blank=True, null=True)
    customer = models.ForeignKey(Cliente, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'direccion'

class Cuenta(models.Model):
    account_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Cliente, models.DO_NOTHING)
    balance = models.DecimalField(decimal_places=2, max_digits=15)
    iban = models.TextField()
    numero_cuenta = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cuenta'

class Prestamo(models.Model):
    loan_id = models.AutoField(primary_key=True)
    loan_type = models.TextField()
    loan_date = models.TextField()
    loan_total = models.IntegerField()
    customer_id = models.IntegerField()
    branch_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'prestamo'

class TipoTarjeta(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.TextField(db_column='Nombre')

    class Meta:
        managed = False
        db_table = 'tipo_tarjeta'

class Tarjeta(models.Model):
    numero = models.TextField(db_column='Numero')
    cvv = models.IntegerField(db_column='CVV', blank=True, null=True)
    fechaotorgamiento = models.DateField(db_column='FechaOtorgamiento', blank=True, null=True)
    fechaexpiracion = models.DateField(db_column='FechaExpiracion', blank=True, null=True)
    tipotarjeta = models.TextField(db_column='TipoTarjeta', blank=True, null=True)
    id = models.IntegerField(db_column='ID', blank=True, null=True)
    tarjeta_id = models.AutoField(primary_key=True)
    tipo_tarjeta = models.ForeignKey(TipoTarjeta, models.DO_NOTHING, blank=True, null=True)
    customer = models.ForeignKey(Cliente, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tarjeta'