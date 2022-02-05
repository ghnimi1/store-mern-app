import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from "../types";
import axios from "../../../axios";

export const loginUser = (user) => {
    return dispatch => {
        axios.post('/auth/login', user)
            .then(res => {
                let token = localStorage.setItem('token', res.data.token);
                dispatch(loginUserSuccess(user, token));
                window.location.replace('/')
                console.log(res);
            })
            .catch(err => {
                let error = err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg;
                dispatch(loginUserFailure(error));
            });
    }
};

const loginUserSuccess = (user, token) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            user,
            token
        }
    };
};

const loginUserFailure = error => {
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            error
        }
    };
};