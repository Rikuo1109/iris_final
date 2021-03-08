from django.shortcuts import render
from rest_framework import permissions, decorators, exceptions
from utils import viewset, http_code
from utils.services import product as product_services
from . import serializers, models

class ProductViewSet(viewset.BaseView):
    permission_classes = [permissions.AllowAny, ]
    serializer_classes = {
        'item_list': serializers.ItemListSerializer,
    }
    
    
    

    @decorators.action(methods=['GET', ], detail = False)
    def item_list(self, request):
        serializer = self.get_serializer(data=request.GET)
        
        try:
            serializer.is_valid(raise_exception=True)

            data= product_services.get_item_list(**serializer.validated_data)

            return self.get_response(
                data=data,
                error_code=http_code.HttpSuccess
            )

        except exceptions.ValidationError as e:
            return self.get_response(data=e.detail, error_code=e.status_code)

        