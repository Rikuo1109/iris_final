import uuid

from django.db import models

from .fields import (
    UnixTimeStamp,
    StatusField
)


class BaseModel(models.Model):

    uid = models.UUIDField(
        default = uuid.uuid4,
        unique = True,
        editable = False
    )

    status = StatusField()

    created_at = UnixTimeStamp(
        auto_now_add = True, 
        auto_now = False
    )

    updated_at = UnixTimeStamp(
        auto_now_add = False, 
        auto_now = True
    )

    class Meta:
        abstract = True