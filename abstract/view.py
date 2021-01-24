from rest_framework.views import APIView
from django.http import JsonResponse
from constant import errorCode

class BaseView(APIView):
    def __init__(self, *args, **kwargs):
        self._data = None
        self._code = errorCode.SUCCESS
        super(BaseView, self).__init__(*args, **kwargs)

    def get_response(self):
        return JsonResponse(
            data={
                'data': self._data,
                'code': self._code
            }
        )

    def set_response(self, value):
        try:
            self._data, self._code = value
        except:
            raise ValueError(f'Can not unpack {value} to response')

