from tensorflow.keras.models import load_model

modelCF = load_model('./utils/recomender/CF')
from pandas import read_csv
from numpy import array, repeat
user_2_code = read_csv('./utils/recomender/user_data.csv').set_index('customer_id').to_dict('index')
book_2_code = read_csv('./utils/recomender/item_data.csv').set_index('product_id').to_dict('index')
code_2_book = read_csv('./utils/recomender/item_data.csv').set_index('item_code').to_dict('index')
book_2_cbid = read_csv('./utils/recomender/cbIndex.csv').set_index('id').to_dict('index')
cbid_2_book = read_csv('./utils/recomender/cbIndex.csv').set_index('cb_idx').to_dict('index')
def cf_filter(user_id, booklist=[], num=None):
    user_input = [[user_2_code[int(user_id)]['user_code']]]
    booklist = list(filter(lambda book: book.sku in book_2_code, booklist))
    to_code = lambda book: [book_2_code[book.sku]['item_code']]
    item_input = array(list(map(to_code, booklist)))
    user_input = repeat(user_input, item_input.shape[0], axis=0)
    scores = modelCF.predict([user_input, item_input]).flatten()
    idx = scores.argsort()[-1*num:][::-1] if type(num) is int else scores.argsort()[::-1]
    return [booklist[i] for i in idx]

class CB(object):
  def __init__(self, threshold = 0.5):
    self._threshold = threshold

  def load_content_matrix(self):
    import pickle
    self.tfidf_matrix = pickle.load(open('./utils/recomender/tfidf.pkl','rb')).toarray()


  def filter_product(self, _input, _output):
    from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

    _input_tfidf, _output_tfidf = self.tfidf_matrix[_input], self.tfidf_matrix[_output]

    similar_items = cosine_similarity(_output_tfidf, _input_tfidf)

    results = []
    for index, item in enumerate(_output):
      if any(map(lambda x: x > self._threshold, similar_items[index])):
        results.append(item)
    return results

cb = CB(0.2)
cb.load_content_matrix()
def cb_filter(rated_books, target_books):
    rated_books = [book_2_cbid[book.sku]['cb_idx'] for book in rated_books]
    output = [book_2_cbid[book.sku]['cb_idx'] for book in target_books]
    output = cb.filter_product(rated_books, output)
    output = [cbid_2_book[i]['id'] for i in output]
    return list(filter(lambda book: book.sku in output, target_books))
    