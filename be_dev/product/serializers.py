from rest_framework import serializers

from .models import Book, Category, Author

PAGE_NUMBER = 1
PAGE_SIZE = 10

class ItemListSerializer(serializers.Serializer):
    keyword = serializers.CharField(required=False)
    page_number = serializers.IntegerField(required=False)
    page_size = serializers.IntegerField(required=False)
    option = serializers.CharField(required=False)

    def validate_keyword(self, value):
        if value:
            books = Book.objects.filter(name=value)
            if not books:
                raise serializers.ValidationError('Books is not exists')
        return value

    def validate_page_number(self, value):
        return value if value else PAGE_NUMBER

    def validate_page_size(self, value):
        return value if value else PAGE_SIZE

    def validate_option(self, value):
        return value

class ItemCreateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    price = serializers.IntegerField(required=True)
    first_price = serializers.IntegerField(required=True)
    short_description = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    number_pages = serializers.IntegerField(required=True)
    issuing_company = serializers.CharField(required=True)
    publisher = serializers.CharField(required=True)
    categories = serializers.ListField(
        child = serializers.CharField()
    )
    authors = serializers.ListField(
        child = serializers.CharField()
    )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields = ('uid', 'name', 'parent')
        fields = ('name',)

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('uid', 'name')

class ItemSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)
    # authors = AuthorSerializer(read_only=True, many=True)
    class Meta:
        model = Book
        fields = ('name', 'categories')