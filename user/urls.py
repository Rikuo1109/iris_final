from django.urls import path
from .views import UserManagement

urlpatterns = [
    path('list-user/', UserManagement.as_view())
]