from django.db import models

class AuthUser(models.Model):
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

class TipoCliente(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField(db_column='Nombre')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipo_cliente'

class Cliente(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.TextField()
    customer_surname = models.TextField()  # This field type is a guess.
    customer_dni = models.TextField(db_column='customer_DNI')  # Field name made lowercase.
    dob = models.TextField(blank=True, null=True)
    branch_id = models.IntegerField()
    tipo_cliente = models.ForeignKey(TipoCliente, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cliente'

class Cuenta(models.Model):
    account_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Cliente, models.DO_NOTHING)
    balance = models.IntegerField()
    iban = models.TextField()
    numero_cuenta = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'cuenta'