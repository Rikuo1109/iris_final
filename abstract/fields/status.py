from django.db.models.fields import (
    CharField
)

# from constant import (
#     STATUS_CHOICE,
#     status
# )

from constant import (
    STATUS_CHOICE,
)

from constant.status import WAITING

class StatusField(CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 1
        kwargs['choices'] = STATUS_CHOICE
        kwargs['default'] = WAITING
        super().__init__(*args, **kwargs)

    
