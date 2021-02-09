from django.contrib import admin

from .models import *

admin.site.register(Author)
admin.site.register(Image)
admin.site.register(Category)

def book_create(*, name, price, first_price, short_description, description, number_pages, issuing_company, publisher, categories, authors):
    from constant import STATUS_CHOICES
    book = Book.objects.create(
        name=name,
        status=STATUS_CHOICES.ACTIVE,
        price=price,
        first_price=first_price,
        short_description=short_description,
        description=description,
        number_pages=number_pages,
        issuing_company=issuing_company,
        publisher=publisher,
        categories=categories,
        authors=authors
    )

@admin.register(Book)
class BaseBookAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'rating', 'rating_count')

    search_fields = ('name',)

    fieldsets = (None, {'fields': ('name', 'status', 'price', 'first_price', 'short_description',
                                    'description', 'number_pages', 'issuing_company', 'publisher', 'categories', 'authors')}),

    def save(self, request, obj, form, change):
        if change:
            return super().save_model(request, obj, form, change)
        try:
            user_create(**form.cleaned_data)
        except ValidationError as exc:
            self.message_user(request, str(exc), messages.ERROR)

