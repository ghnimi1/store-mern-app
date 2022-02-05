import {
    FETCH_SINGLE_USER_STARTED,
    FETCH_SINGLE_USER_SUCCESS,
    FETCH_SINGLE_USER_FAILURE,
} from '../types'
import axios from '../../../axios'

export const fetchSingleUser = (id) => {
    return dispatch => {
        dispatch(fetchSingleUserStarted());
        axios.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                let user = res.data;
                dispatch(fetchSingleUserSuccess(user));
            })
            .catch(error => {
                dispatch(fetchSingleUserFailure(error.response));
            });
    }
}

const fetchSingleUserStarted = () => {
    return {
        type: FETCH_SINGLE_USER_STARTED
    }
}

const fetchSingleUserSuccess = (user, id) => {
    return {
        type: FETCH_SINGLE_USER_SUCCESS,
        payload: {
            user,
            id
        }
    }
}

const fetchSingleUserFailure = (error) => {
    return {
        type: FETCH_SINGLE_USER_FAILURE,
        payload: {
            error
        }
    }
}