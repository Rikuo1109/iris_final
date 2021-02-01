
from django.urls import path, include
from .views import UserAccountManagement

urlpatterns = [
    path('register/', UserAccountManagement.Register.as_view()),
    path('active/', UserAccountManagement.Active.as_view())
    path('login/', UserAccountManagement.Login.as_view())
]
