import pandas as pd
from datetime import datetime
from math import isnan


def convertTimestamp(x): return datetime.fromtimestamp(
    x).strftime("%Y-%m-%d %H:%M:%S")


def prepare_book():
    data = pd.read_csv('''D:/Dataset/Thesis/Tiki's Rating/bookInfo_full.csv''')
    f = open("insertBook.sql", "w", encoding="utf-8")
    for row in data.itertuples():
        f.write('''INSERT INTO product_book ('uid', 'status', 'created_at', 'updated_at', 'name', 'price', 'first_price', 'short_description', 'description', "number_pages", "issuing_company", "publisher", "rating_count", "rating_sum", "sku")\nVALUES\n''')
        text = f'''    ('{row.uuid}', 'W', '2021-04-03 03:59:48.344033', '2021-04-03 03:59:48.344033', '{row.name}', {row.price}, {row.first_price}, '{row.short_description}', '{row.description}', {row.num_pages}, '{row.issuing_company}', '{row.publisher_name}', 0, 0, {row.id});\n'''
        try:
            f.write(text)
        except Exception as e:
            print(e)
    f.close()


# prepare_book()

def prepare_author():
    data = pd.read_csv('''D:/Dataset/Thesis/Tiki's Rating/author_full.csv''')
    f = open("insertAuthor.sql", "w", encoding="utf-8")
    f.write('''INSERT INTO product_author ("uid", "status", "created_at", "updated_at", "name")\nVALUES\n''')
    for row in data.itertuples():
        text = f'''    ('{row.uuid}', 'W', '2021-04-04 02:11:34.403386', '2021-04-04 02:11:34.403386', '{row.name}'),\n'''
        try:
            f.write(text)
        except Exception as e:
            print(e)
    f.close()


# prepare_author()


def prepare_book_categories():
    from product.models import Book, Category
    booklist = Book.objects.all()
    book_dict = {}
    for book in booklist:
        book_dict[book.sku] = book.id

    catelist = Category.objects.all()
    cate_dict = {}
    for cate in catelist:
        cate_dict[cate.code] = cate.id
    data = pd.read_csv(
        '''D:/Dataset/Thesis/Tiki's Rating/book_category_full.csv''')
    f = open("insertBookCategory.sql", "w", encoding="utf-8")
    f.write(
        '''INSERT INTO product_book_categories ("book_id", "category_id")\nVALUES\n''')
    for row in data.itertuples():
        try:
            text = f'''    ({book_dict[row.sku]}, {cate_dict[row.category]}),\n'''
            f.write(text)
        except Exception as e:
            print(e)
    f.close()


def prepare_book_author():
    from product.models import Book, Author
    booklist = Book.objects.all()
    book_dict = {}
    for book in booklist:
        book_dict[book.sku] = book.id

    authorlist = Author.objects.all()
    author_dict = {}
    for author in authorlist:
        author_dict[author.uid.hex] = author.id
    data = pd.read_csv(
        '''D:/Dataset/Thesis/Tiki's Rating/book_author_full.csv''')
    f = open("insertBookAuthor.sql", "w", encoding="utf-8")
    f.write(
        '''INSERT INTO product_book_authors ("book_id", "author_id")\nVALUES\n''')
    for row in data.itertuples():
        try:
            text = f'''    ({book_dict[row.sku]}, {author_dict[row.uuid]}),\n'''
            f.write(text)
        except Exception as e:
            print(e)
    f.close()


# prepare_book_author()
def prepare_rate():
    from product.models import Book
    booklist = Book.objects.all()
    book_dict = {}
    for book in booklist:
        book_dict[book.sku] = book.id
    from user.models import User
    userlist = User.objects.all()
    user_dict = {}
    for user in userlist:
        user_dict[int(user.email.split('@')[0])] = user.id
    data = pd.read_csv(
        '''D:/Dataset/Thesis/Tiki's Rating/rate_full.csv''')
    f = open("insertRate.sql", "w", encoding="utf-8")
    f.write('''INSERT INTO interaction_interaction ("uid", "status", "created_at", "updated_at", "rating", "content", "header", "book_id", "user_id")\nVALUES\n''')
    for row in data.itertuples():
        try:
            text = f'''    ('{row.uuid}', 'W', '{convertTimestamp(row.timestamp)}', '{convertTimestamp(row.timestamp)}', {row.rating}, '{row.content}', '{row.title}', '{book_dict[row.product_id]}', '{user_dict[row.customer_id]}'),\n'''
            f.write(text)
        except Exception as e:
            print(e)
    f.close()


# prepare_rate()
def prepare_images():
    from product.models import Book
    booklist = Book.objects.all()
    book_dict = {}
    for book in booklist:
        book_dict[book.sku] = book.id
    data = pd.read_csv(
        '''D:/Dataset/Thesis/Tiki's Rating/images_x1.csv''')
    f = open("insertImages.sql", "w", encoding="utf-8")
    f.write('''INSERT INTO product_image ("uid", "status", "created_at", "updated_at", "url", "description", "book_id")\nVALUES\n''')
    for row in data.itertuples():
        try:
            text = f'''    ('{row.uuid}', 'W', '2021-04-04 02:11:34.403386', '2021-04-04 02:11:34.403386', '{row.images}', '', {book_dict[row.id]}),\n'''
            f.write(text)
        except Exception as e:
            print(e)
    f.close()


prepare_images()
