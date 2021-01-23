from django.contrib import admin, messages
from django.core.exceptions import ValidationError

from .models import User

def user_create(*, email, password, is_active = False, is_admin = False) -> User:

    user = User.objects.create_user(
        email = email,
        password = password,
        is_active = is_active,
        is_admin = is_admin 
    )

    return user

@admin.register(User)
class BaseUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'status', 'is_admin', 'is_superuser', 'is_active', 'created_at', 'updated_at')

    search_fields = ('email',)

    list_filter = ('is_active', 'is_admin', 'is_superuser')

    fieldsets = (
        (None, {'fields': ('email', 'password', 'is_active', 'is_admin', 'is_superuser', 'status')}),
    )

    def save_model(self, request, obj, form, change):
        if change:
            return super().save_model(request, obj, form, change)
        try:
            user_create(**form.cleaned_data)
        except ValidationError as exc:
            self.message_user(request, str(exc), messages.ERROR)
