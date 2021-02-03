from abstract.view import BaseView
from rest_framework.serializers import ModelSerializer
from constant import status_code
from .models import User
from services.user_services import services as user_services
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
import jwt


EMAIL = 'email'
PASSWORD = 'password'
class UserAccountManagement:
    class Login(TokenObtainPairView, BaseView):
        def post(self, request):
            email = request.POST.get(EMAIL, None)
            password = request.POST.get(PASSWORD, None)

            if user_services._check_login(email=email, password=password):
                token = super().post(request).data
                self._set((token, status_code.SUCCESS))
            else:
                self._set((None, status_code.CANNOT_LOGIN))
            return self._get()

    class ChangePassword(BaseView):
        NEW_PASSWORD = 'new_'+PASSWORD
        CURRENT_PASSWORD = 'current_'+PASSWORD

        def post(self, request):
            user = request.user
            new_password = request.POST.get(self.NEW_PASSWORD, None)
            current_password = request.POST.get(self.CURRENT_PASSWORD, None)
            
            if user_services._check_password(user, current_password):
                user_services._change_password(user, new_password)
            else:
                self._set((None, status_code.NOT_CORRECT_PASSWORD))
            return self._get()

    class Register(TokenObtainPairView,BaseView):
        # -> Completed: Can create new user (catch duplication error), send email to user
        # -> Not completed: Missing email's content

        EMAIL_SUBJECT = 'Active account on IRIS system'
        EMAIL_CONTENT = 'Please click the link bellow to active the account {0}'

        def post(self, request):
            email = request.POST.get(EMAIL, None)
            password = request.POST.get(PASSWORD, None)

            from services.email_senders import EmailSender
            from smtplib import SMTPRecipientsRefused

            try:
                user = User.objects.create_user(email=email, password=password)
            except Exception as e:
                self._set((str(e), status_code.CANNOT_CREATE_USER))
            else:
                try:
                    token = RefreshToken.for_user(user).access_token
                    link = f'http://{get_current_site(request).domain}{reverse("user-active")}?token={token}'
                    email_sender = EmailSender()
                    email_sender.set_email(self.EMAIL_SUBJECT, self.EMAIL_CONTENT.format(link))
                    email_sender.set_receivers(email)
                    email_sender.send()
                except SMTPRecipientsRefused as e:
                    self._set((str(e), status_code.CANNOT_SEND_EMAIL))
            return self._get()

    class Active(BaseView):
        def get(self, request):
            token = request.GET.get('token', None)
            try:
                payload = jwt.decode(token, settings.SECRET_KEY)
                user_services._active(payload['user_id'])
            except Exception as e:
                print(e)
            return self._get()
