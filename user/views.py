from abstract.view import BaseView
from abstract.serializer import BaseSerializer
from constant import errorCode
from .models import User

class UserManagement(BaseView):
    class UserSerializer(BaseSerializer):
        class Meta: 
            model = User
            fields = ['uid', 'email', 'is_admin', 'is_active']

    def get(self, request):
        users = self.UserSerializer(User.objects.all(), many=True)
        self.set_response((users.data, errorCode.SUCCESS))
        return self.get_response()

    def post(self, request):
        return self.get_response()
