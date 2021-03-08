const API_ROOT = process.env.REACT_APP_API_DOMAIN;

const LOGIN = API_ROOT + 'api/auth/login'

const GET_CATEGORRIES = API_ROOT + ''
const GET_BOOK_INFO = API_ROOT + '/item-info'


const GET_PUBLISHER = API_ROOT + ''

export const API_CONST = {
    LOGIN,
    GET_CATEGORRIES,
    GET_BOOK_INFO,
    GET_PUBLISHER,
}