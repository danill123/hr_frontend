import { LOGIN_FAILED, LOGIN_ERROR, LOGIN_SUCCESS } from "../constantsvar";

const initialLoginState = { 
    successAuth : false,
    failedAuth: false,
    errorAuth: false
};

export const Login = (state=initialLoginState, action={}) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {auth: action.auth});
        case LOGIN_FAILED:
            return Object.assign({}, state, {failedAuth: true});
        case LOGIN_ERROR:
            return Object.assign({}, state, {errorAuth: true});
        default:
            return state;
    }
}