from product import models, serializers
from django.core.paginator import Paginator
from rest_framework import pagination


PAGE_NUMBER = 1
PAGE_SIZE = 10

class Pagination(pagination.PageNumberPagination):

    # def get_page_size

    def get_paginated_response(self, data, page_size):
        pass


def get_item_list(keyword = None, page_number = PAGE_NUMBER, page_size = PAGE_SIZE, option=''):
    if keyword:
        books = models.Book.objects.filter(name=keyword)
    else:
        books = models.Book.objects.all()

    data = serializers.ItemSerializer(books, many=True).data

    pagination_data = Paginator(object_list=data, per_page=page_size).get_page(page_size)

    return list(pagination_data)
    