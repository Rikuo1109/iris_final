from abstract.view import BaseView

from constant import status_code

from rest_framework_simplejwt.views import TokenObtainPairView

from services.user_services import services as user_services

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

    class Register(TokenObtainPairView, BaseView):
        # -> Completed: Can create new user (catch duplication error), send email to user
        # -> Not completed: Missing email's content

        def post(self, request):
            email = request.POST.get(EMAIL, None)
            password = request.POST.get(PASSWORD, None)

            from services.email_senders import register_user as email_sender
            from smtplib import SMTPRecipientsRefused

            try:
                user = user_services._create_user(email, password)
            except Exception as e:
                self._set((str(e), status_code.CANNOT_CREATE_USER))
            else:
                try:
                    from django.contrib.sites.shortcuts import get_current_site

                    domain = get_current_site(request).domain

                    email_sender(domain=domain, user=user)
                except SMTPRecipientsRefused as e:
                    self._set((str(e), status_code.CANNOT_SEND_EMAIL))
            return self._get()

    class Active(BaseView):
        def get(self, request):
            token = request.GET.get('token', None)
            try:
                from django.conf import settings

                payload = jwt.decode(token, settings.SECRET_KEY)
                user_services._active(payload['user_id'])
            except Exception as e:
                print(e)
            return self._get()

    class ForgotPassword(BaseView):
        def post(self, request):
            email = request.POST.get('email', None)

            from services.email_senders import forgot_password as email_sender

            try:
                from django.contrib.sites.shortcuts import get_current_site

                domain = get_current_site(request).domain
                email_sender(domain=domain, email=email)

            except:
                self._set((None, status_code.CANNOT_SEND_EMAIL))

            return self._get()

    class ResetPassword(BaseView):
        def get(self, request):
            token = request.GET.get('token', None)
            password = request.GET.get('password', None)

            try:
                from django.conf import settings

                id = jwt.decode(token, settings.SECRET_KEY)['user_id']

                user_services._reset_password(id, password)

            except:
                self._set((None, status_code.CANNOT_RESET_PASSWORD))

            return self._get()

    class Logout(BaseView):
        def get(self, request):
            token = request.POST.get('token', None)
            from rest_framework_simplejwt.tokens import RefreshToken
            try:
                RefreshToken(token).blacklist()
            except:
                self._set((None, status_code.BAD_TOKEN))

            return self._get()
