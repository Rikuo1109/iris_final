from rest_framework import serializers

from .models import Book, Category

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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('uid', 'name')

class ItemSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Book
        fields = '__all__'