const API_ROOT = process.env.REACT_APP_API_DOMAIN;
const TEST_MODE = false

const LOGIN = API_ROOT + 'api/auth/login'
const GET_USER_INFO = API_ROOT + 'api/auth/infor'
const LOGOUT = API_ROOT + 'api/auth/logout'

const GET_CATEGORRIES = API_ROOT + 'api/product/category_tree'
const GET_BOOK_INFO = API_ROOT + 'api/product/item_info'
const GET_RECOMMEND_BOOK = API_ROOT + 'api/product/recommend/'
const GET_RELATED_BOOK = API_ROOT + 'api/product/related/'
const GET_COMMON_BOOK = API_ROOT + 'api/product/list_product/'
const GET_RATES = API_ROOT + 'api/interaction/list_interaction'

const GET_AUTHOR = API_ROOT + 'api/product/author'
const GET_PUBLISHER = API_ROOT + 'api/product/publisher'

export const API_CONST = {
    TEST_MODE,
    LOGIN,
    GET_USER_INFO,
    LOGOUT,
    GET_CATEGORRIES,
    GET_BOOK_INFO,
    GET_RECOMMEND_BOOK,
    GET_RELATED_BOOK,
    GET_COMMON_BOOK,
    GET_RATES,
    GET_AUTHOR,
    GET_PUBLISHER,
}