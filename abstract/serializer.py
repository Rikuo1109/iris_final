from rest_framework.serializers import ModelSerializer

class BaseSerializer(ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(BaseSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for _field in existing - allowed:
                self.fields.pop(_field)