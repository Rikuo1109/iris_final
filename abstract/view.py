from rest_framework.views import APIView
from constant.status_code import SUCCESS
from django.http import JsonResponse

class Response:
    def __init__(self, data = None, code = SUCCESS):
        self._data = data
        self._code = code

    def _get(self):
        return JsonResponse(
            {
                'data': self._data,
                'code': self._code
            }
        )

    def _set(self, data = None, code = SUCCESS):
        self._data = data
        self._code = code

class BaseView(APIView):
    def __init__(self):
        self._response = Response()

    def _set(self, value):
        self._response._set(*value)
    
    def _get(self):
        return self._response._get()
        
