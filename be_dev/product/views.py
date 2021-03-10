from django.shortcuts import render
from rest_framework import permissions, decorators, exceptions, generics
from utils import viewset, http_code
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from utils.services import product as product_services
from . import serializers, models, filters as product_filters

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

class PopularProduct(generics.ListAPIView):
    from rest_framework import pagination
    queryset = models.Book.objects.all()
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.AllowAny, )
    filter_backends = [filters.SearchFilter, product_filters.PriceFilter, \
                        product_filters.AuthorFilters,
                         product_filters.CategoryFilter,
                         product_filters.PublisherFilter,
                         product_filters.RatingFilter,]
    search_fields = ['name']
    pagination_classes = pagination.PageNumberPagination
    # filter_backends = ()

    def list(self, request):
        from django.http import JsonResponse
        try:
            data = super().list(request).data
            return JsonResponse({
                'data': data, 
                'error_code':0
            })
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({
                'data': None,
                'error_code':0
            })

class CategoryTree(generics.ListAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    def list(self, request):
        from django.http import JsonResponse
        data = super().list(request).data["results"]
        category_names = [d["name"] for d in data]
        category_tree = {}
        for idx, category_name in enumerate(category_names):
            category_tree[category_name] = {"children": [], "uid": data[idx]["uid"]}
        for category in data:
            if category["parent"]:
                category_tree[category_names[category["parent"] - 1]]["children"].append({category["name"]: category_tree[category["name"]]})
        # print(category_tree)
        response_data = {"root" : category_tree["root"]}

        return JsonResponse({
                'data': response_data,
                'error_code':0
            })
