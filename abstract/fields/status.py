from django.db.models.fields import (
    CharField
)

# from constant import (
#     STATUS_CHOICE,
#     status
# )

from constant import (
    STATUS_CHOICES
)

class StatusField(CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 1
        kwargs['choices'] = STATUS_CHOICES.choices
        kwargs['default'] = STATUS_CHOICES.WAITING
        super().__init__(*args, **kwargs)

    
