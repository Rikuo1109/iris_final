from django.db import models

from django.contrib.auth.models import (
    BaseUserManager as BUM,
    PermissionsMixin,
    AbstractBaseUser
)

from abstract.models import BaseModel

# Create your models here.

class BaseUserManager(BUM):
    def create_user(self, email, is_active=False, is_admin=False, is_staff=False, password=None):
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email=self.normalize_email(email.lower()),
            is_active=is_active,
            is_admin=is_admin,
        )

        if password is not None:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.full_clean()
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email=email,
            password=password,
            is_active=True,
            is_admin=True,
            
        )

        from constant import STATUS_CHOICES as status
        user.is_superuser = True
        user.status = status.ACTIVE
        user.save(using=self._db)

        return user


class User(BaseModel, AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = BaseUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def is_staff(self):
        return self.is_admin

    def save(self, *args, **kwargs):
        from constant import STATUS_CHOICES as status
        if self.status == status.REMOVE or self.status == status.WAITING:
            self.is_active = False
        else:
            self.is_active = True
        super(User, self).save(*args, **kwargs)
