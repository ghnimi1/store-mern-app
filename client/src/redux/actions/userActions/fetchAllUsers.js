import {
    FETCH_USERS_STARTED,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from '../types'
import axios from '../../../axios'

export const fetchAllUsers = (keyword = '', pageNumber = '') => {
    return dispatch => {
        dispatch(fetchAllUsersStarted());
        axios.get(`/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                let users = res.data;
                dispatch(fetchAllUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchAllUsersFailure(error.response));
            });
    }
}

const fetchAllUsersStarted = () => {
    return {
        type: FETCH_USERS_STARTED
    }
}

const fetchAllUsersSuccess = (users, keyword, pageNumber) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: {
            users,
            keyword,
            pageNumber
        }
    }
}

const fetchAllUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: {
            error
        }
    }
}