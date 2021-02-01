from abstract.view import BaseView
from rest_framework.serializers import ModelSerializer
from constant import status_code
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class UserAccountManagement:
    class Login(BaseView):
        # -> Completed: Nothing
        # -> Not completed: Everything

        def get_object(self, email):
            try:
                return User.objects.get(email = email)
            except User.DoesNotExist:
                from django.http import Http404
                raise Http404
        
    class Register(BaseView):
        # -> Completed: Can create new user (catch duplication error), send email to user
        # -> Not completed: Missing email's content

        def post(self, request):
            email = request.POST.get('email', None)
            password = request.POST.get('password', None)

            from django.db.utils import IntegrityError

            try:
                from services.email_senders import EmailSender

                User.objects.create(email=email, password = password)
                
                email_sender = EmailSender()
                email_sender.set_receivers(email)
                email_sender.send()

            except IntegrityError as e:
                self._set((str(e), status_code.DUPLICATION))
            
            return self._get()

    class Active(BaseView):
        # -> Completed: Nothing
        # -> Not completed: Everything

        def get(self, request):
            return self._get()

