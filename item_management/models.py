from django.db import models

# Create your models here.
class Book(BaseModel):
    
    name = models.CharField('name of book', max_length=100)
    price = models.IntegerField()
    first_price = models.IntegerField()
    short_description = models.CharField(max_length=500)
    description = models.CharField(max_length=1000)
    rating_sum = models.IntegerField()
    publisher = models.CharField(max_length=100)
    number_pages = models.IntegerField()
    issuing_company = models.CharField(max_length=100)
    rating_count = models.IntegerField()

    def __str__ (self):
        return "BOOK: {}\nPrice: {}\nRating sum: {}\nRating count: {}\n".format(self.name, self.price, self.rating_sum, self.rating_count)

class Category(BaseModel):

    parent = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return "Catefory name: {}\n From parent: {}".format(self.name, self.parent)

class Author(BaseModel):

    name = models.CharField(max_length=100)

class Rate(BaseModel):

    product = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)
    delivery_datetime = models.DateField()
    review_datetime = models.DateField()

    def __str__(self):
        return "Rate of Book ID: {}\nTitle: {}".format(self.product_id, self. title)
class Image(BaseModel):
    
    url = models.CharField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return "Image url: {}".format(self.url)

class Book_Category(BaseModel):
    
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

class Book_author(BaseModel):

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)