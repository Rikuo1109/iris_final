import { toastUtil } from '../utils/toastUtil'
const errorMessage = {
    DEFAULTMESSAGE: 'Không thành công!!'
}
const updateOrCreateHeader = header => {
    if (header === null || header === void 0) {
        header = {
            method: 'GET',
            headers: {

            }
        }
    }
    let token = localStorage.getItem('access');
    if (token === null) {
    }
    if (header.headers === null || header.headers === void 0) {
        header.headers = {};
    }
    header.headers.Authorization = "Bearer " + token;
    return header;
}
const checkResponseErrorCode = (data, successMessage, customErrorMessage) => {
    if (successMessage === void (0)) {
        successMessage = 'Thành Công!'
    }
    if (data && data.errorCode > 0) {
        toastUtil.showErrorMsg(customErrorMessage[data && data.errorCode && `CODE_${data.errorCode}`] || errorMessage[(data && data.errorCode && `CODE_${data.errorCode}`)] || errorMessage.DEFAULTMESSAGE)
    } else {
        toastUtil.showSuccessMsg(successMessage)
    }
}

export const tokenUtil = {
    updateOrCreateHeader,
    checkResponseErrorCode,
};