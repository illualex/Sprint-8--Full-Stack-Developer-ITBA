from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Sum
from .models import Cliente, AuthUser, Tarjeta, Compra, Pago
from rest_framework.authentication import TokenAuthentication

class TarjetasView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        usuario = AuthUser.objects.get(username=user)
        cliente = Cliente.objects.get(user=usuario)
        tarjetas = Tarjeta.objects.filter(customer=cliente)
        resultados = []
        for tarjeta in tarjetas:
            compras = Compra.objects.filter(tarjeta=tarjeta)
            pagos = Pago.objects.filter(compra__tarjeta=tarjeta)
            total_compras = compras.aggregate(Sum('monto'))['monto__sum'] or 0
            total_pagos = pagos.aggregate(Sum('monto_pagado'))['monto_pagado__sum'] or 0
            saldo_pendiente = total_compras - total_pagos
            resultados.append({
                'tipo_tarjeta': tarjeta.tipo_tarjeta.id, 
                'tarjeta_numero': tarjeta.numero,
                'saldo_pendiente': saldo_pendiente,
            })
        return JsonResponse({'resultados': resultados})