from django.db import models

# Create your models here.
from utils.model import BaseModel
from user.models import User
from product.models import Book

class Interaction(BaseModel):
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    book = models.ForeignKey(to=Book, on_delete=models.CASCADE)
    rating = models.IntegerField()
    content = models.CharField(max_length=200)
    header = models.CharField(max_length=50)
    

