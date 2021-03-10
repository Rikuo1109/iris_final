from rest_framework import filters

class PriceFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        max_price = request.GET.get('max_price', None)
        min_price = request.GET.get('min_price', 0)
        print(max_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        queryset = queryset.filter(price__gte=min_price)
        return queryset

class RatingFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        rate_num = int(request.GET.get('rate_num', 0))

        return [obj for obj in queryset if obj.rating >= rate_num]

class AuthorFilters(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        author_id = request.GET.get('author_id', None)
        if author_id:
            queryset = queryset.filter(authors__uid=author_id) 
        return queryset

class CategoryFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        category_id = request.GET.get('category_id', None)
        if category_id:
            queryset = queryset.filter(categories__uid=category_id) 
        return queryset
class PublisherFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        publisher = request.GET.get('publisher', None)
        if publisher:
            queryset = queryset.filter(publisher__icontains=publisher)
        return queryset