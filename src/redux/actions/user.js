import { BASE_API_URL, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_FAILED } from "../constantsvar";

export const userLogin = (email, password) => {
    console.log(email, password)
    return dispatch => {
        dispatch({type: LOGIN_ERROR})
    }
}