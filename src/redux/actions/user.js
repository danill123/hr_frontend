import axios from 'axios';
import { BASE_API_URL, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, JWT_KEY } from "../constantsvar";

const jwt = require('jsonwebtoken');

export const userLogin = (email, password) => {
    console.log("login run")
    return async dispatch => {
        try {
            let resp = await axios.post(`${BASE_API_URL}/auth`, {"email" : email, "password" : password}, { headers: {'Content-Type': 'application/json'}})
            if(resp.data.auth) {
                let session_hash = jwt.sign(resp.data, JWT_KEY);
                localStorage.setItem('user_session', session_hash);
                dispatch({type: LOGIN_SUCCESS})
            } else {
                dispatch({type: LOGIN_FAILED})
            }
        } catch (err) {
            dispatch({type: LOGIN_ERROR})
        }
    }
}