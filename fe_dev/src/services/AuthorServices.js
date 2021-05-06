import { API_CONST } from "./APIs";
import fetch from 'cross-fetch';
// import { tokenUtil } from './tokenUtil';


const getAuthors = async (categoryID) => {
    if (API_CONST.TEST_MODE) {
        return [true, {
            data: [
                'Tác giả 1',
                'Tác giả 2',
                'Tác giả 3',
            ]
        }]
    }
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_AUTHOR + `?category_id=${categoryID}`;
    // tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

export const AuthorServices = {
    getAuthors,
}