
from django.urls import path, include
from .views import UserAccountManagement

urlpatterns = [
    path('register/', UserAccountManagement.Register.as_view(), name="user-register"),
    path('active/', UserAccountManagement.Active.as_view(), name="user-active"),
    path('login/', UserAccountManagement.Login.as_view(), name="user-login"),
    path('change-password/', UserAccountManagement.ChangePassword.as_view(), name="user-change-password"),
    path('forgot-password/', UserAccountManagement.ForgotPassword.as_view(), name="user-forgot-password"),
    path('reset-password/', UserAccountManagement.ResetPassword.as_view(), name="user-reset-password"),
    path('logout/', UserAccountManagement.Logout.as_view(), name="user-logout")
]
