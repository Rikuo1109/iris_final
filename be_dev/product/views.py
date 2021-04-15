from django.shortcuts import render
from rest_framework import permissions, decorators, exceptions, generics
from utils import viewset, http_code
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from utils.services import product as product_services
from . import serializers, models, filters as product_filters
from utils.recomender.CF import cf_filter, cb_filter


class ProductViewSet(viewset.BaseView):
    permission_classes = [permissions.AllowAny, ]
    serializer_classes = {
        'item_list': serializers.ItemListSerializer,
        'item_create': serializers.ItemCreateSerializer,
    }

    @decorators.action(methods=['GET', ], detail=False)
    def item_list(self, request):
        serializer = self.get_serializer(data=request.GET)

        try:
            serializer.is_valid(raise_exception=True)

            data = product_services.get_item_list(**serializer.validated_data)

            return self.get_response(
                data=data,
                error_code=http_code.HttpSuccess
            )

        except exceptions.ValidationError as e:
            return self.get_response(data=e.detail, error_code=e.status_code)

    @decorators.action(methods=['POST', ], detail=False)
    def item_create(self, request):
        serializer = self.get_serializer(data=request.POST)
        print(request.POST.get('authors'))
        try:
            serializer.is_valid(raise_exception=True)
            # print(serializer)
            new_book = product_services.add_new_item(
                **serializer.validated_data)

            return self.get_response(
                data=new_book,
                error_code=http_code.HttpSuccess
            )

        except exceptions.ValidationError as e:
            return self.get_response(data=e.detail, error_code=e.status_code)


class PopularProduct(generics.ListAPIView):
    from rest_framework import pagination
    queryset = models.Book.objects.all()
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.AllowAny, )
    filter_backends = [filters.SearchFilter, product_filters.PriceFilter,
                       product_filters.AuthorFilters,
                       product_filters.CategoryFilter,
                       product_filters.PublisherFilter,
                       product_filters.RatingFilter, ]
    search_fields = ['name']
    pagination_classes = pagination.PageNumberPagination
    # filter_backends = ()

    def list(self, request):
        from django.http import JsonResponse
        try:
            data = super().list(request).data
            return JsonResponse({
                'data': data,
                'error_code': 0
            })
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({
            'data': None,
            'error_code': 0
        })


class RecommendProduct(generics.ListAPIView):
    from rest_framework import pagination
    queryset = models.Book.objects.all()
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.AllowAny, )
    filter_backends = [filters.SearchFilter, product_filters.PriceFilter,
                       product_filters.AuthorFilters,
                       product_filters.CategoryFilter,
                       product_filters.PublisherFilter,
                       product_filters.RatingFilter, ]
    search_fields = ['name']
    pagination_classes = pagination.PageNumberPagination
    # filter_backends = ()

    def list(self, request):
        from user.models import User
        from interaction.models import Interaction
        from product.models import Book
        from functools import reduce
        # from utils.recomender.CF import cf_filter
        # Get id of user from request
        user_id = request.GET.get('id', None)
        # Select user from database
        user = User.objects.get(email=f'{user_id}@gmail.com')
        # Select interactions of user from database
        user_interaction = Interaction.objects.filter(user=user)
        # Get books user rated
        rated_books = [interaction.book for interaction in user_interaction]

        # Get catefories of rated books
        categories = []
        for book in rated_books:
            for category in book.categories.all():
                if category not in categories:
                    categories.append(category)
        recommended_book = Book.objects.filter(categories__in=categories)
        recommended_book = list(filter(lambda book: book.sku not in [
                                book.sku for book in rated_books], recommended_book))
        recommended_book = cb_filter(rated_books, recommended_book)
        # recommended_book = cf_filter(user_id, recommended_book, 10)
        from django.http import JsonResponse
        # print(self.get_serializer())
        try:
            # data = super().list(request).data
            return JsonResponse({
                'data': {'recommended_books': serializers.ItemSerializer(recommended_book, many=True).data, 'rated_book': serializers.ItemSerializer(rated_books, many=True).data},
                'error_code': 0
            })
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({
            'data': None,
            'error_code': 0
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
            category_tree[category_name] = {
                "children": [], "uid": data[idx]["uid"]}
        for category in data:
            if category["parent"]:
                category_tree[category_names[category["parent"] - 1]]["children"].append(
                    {category["name"]: category_tree[category["name"]]})
        # print(category_tree)
        response_data = {"root": category_tree["root"]}

        return JsonResponse({
            'data': response_data,
            'error_code': 0
        })
