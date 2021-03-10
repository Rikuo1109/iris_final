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