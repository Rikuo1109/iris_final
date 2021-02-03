from user.models import User
from django.http import Http404
from constant import status

class UserServices(object):
    def _get_by_email(self, email):
        try:
            return User.objects.get(email= email)
        except User.DoesNotExist:
            raise Http404

    def _check_password(self, user, password):
        return user.check_password(password)

    def _check_active(self, user):
        return user.is_active

    def _check_login(self, email, password):
        user = self._get_by_email(email)
        return self._check_password(user, password) and self._check_active(user)

    def _change_password(self, user, password):
        user.set_password(password) 
        user.save()

    def _active(self, id):
        try:
            user = User.objects.get(id=id)
            if not (user.status == status.REMOVE):
                user.status = status.ACTIVE
            user.save()
        except Exception as e:
            print(e)


services = UserServices()


    
