import pandas as pd

rate = pd.read_csv('/home/ngcuong/Documents/Thesis/filtered_rate.csv')
n = rate[rate.groupby('customer_id').rating.transform(len) >= 12]

from interaction.models import Interaction
from user.models import User
from product.models import Book

for row in n.itertuples():
    try:
        Interaction.objects.create(
            user=User.objects.get(email=f'{str(row.customer_id)}@gmail.com'),
            book=Book.objects.get(sku=row.product_id),
            rating=row.rating,
            timestampe=row.timeline_review_created_date,
            content=row.content,
            header=row.title,
        )
    except Exception as e:
        print(e)

from user.models import User

for id in ids:
    User.objects.create(
        is_superuser=False,
        email=f'{str(id)}@gmail.com'
    )

#insert Categroy

import pandas as pd

category = pd.read_csv('/home/ngcuong/Documents/Thesis/bookCategory.csv')

from product.models import Category

for row in category.itertuples():
    if row.code == 316:
        pass
    else:
        Category.objects.create(
            name=row.text,
            parent=Category.objects.get(fake_id=row.parent),
            fake_id=row.code,
        )

#insert Book
#17696
import pandas as pd

book = pd.read_csv('/home/ngcuong/Documents/Thesis/bookInfo.csv')

from product.models import Book, Category, Author

for row in book.itertuples():
    try:
        book = Book.objects.get(
            sku=row.id,
        )
        book.categories.set(
            Category.objects.filter(fake_id__in=list(map(int,row.category.split(','))))
        )

        book.authors.set(
            Author.objects.get_or_create(name__in=row.author_name.split('!'))
        )
        book.save()
    except Exception as e:
        print(e)
