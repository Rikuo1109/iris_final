# import numpy as np
# from pandas import read_csv
# from tensorflow.keras.models import load_model

# # from .CB_model import cb

# modelCF = load_model('./utils/recomender/deepcf')


# # def cf_filter(user_id, booklist=[], num=None):
# #     user_input = [[user_2_code[int(user_id)]['user_code']]]
# #     booklist = list(filter(lambda book: book.sku in book_2_code, booklist))
# #     def to_code(book): return [book_2_code[book.sku]['item_code']]
# #     item_input = array(list(map(to_code, booklist)))
# #     user_input = repeat(user_input, item_input.shape[0], axis=0)
# #     scores = modelCF.predict([user_input, item_input]).flatten()
# #     idx = scores.argsort()[-1*num:][::-1] if type(num) is int else scores.argsort()[::-1]
# #     return [booklist[i] for i in idx]


# def cf_filter(book_cat, booklist=[], num=None):
#     user_input = np.zeros((100))
#     for i in book_cat:
#         if (i >= 0) and (i < 100):
#             user_input[i] += 1
#     if np.sum(user_input) > 0:
#         user_input = user_input / np.sum(user_input)

#     book_table = cb.get_item_vector_by_uid(booklist)

#     item_input = np.array(book_table.feature.to_list())

#     user_input = np.repeat(user_input.reshape((1,100)), item_input.shape[0], axis=0)

#     scores = modelCF.predict([user_input, item_input]).flatten()
#     idx = scores.argsort()[-1*num:][::-1] if type(num) is int else scores.argsort()[::-1]
#     skus = book_table.iloc[idx].id.to_list()

#     clauses = ' '.join(['WHEN sku=%s THEN %s' % (pk, i) for i, pk in enumerate(skus)])
#     ordering = 'CASE %s END' % clauses

#     return booklist.filter(sku__in=skus).extra(
#         select={'ordering': ordering}, order_by=('ordering',)
#     )
