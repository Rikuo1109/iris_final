from django.db import models

class STATUS_CHOICES(models.TextChoices):
    REMOVE  = 'R'
    WAITING = 'W'
    ACTIVE  = 'A'
