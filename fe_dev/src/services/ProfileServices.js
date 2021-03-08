import { API_CONST } from "./APIs";
import fetch from 'cross-fetch';

const login = async (data) => {
    let response;
    let options = {
        method: 'POST',
        body: data,
    }
    let url = API_CONST.LOGIN;
    //tokenUtil.updateOrCreateHeader(options);
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

export const ProfileServices = {
    login,
}