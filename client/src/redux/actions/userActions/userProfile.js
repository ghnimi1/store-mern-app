import {
    FETCH_USER_PROFILE_FAILURE,
    FETCH_USER_PROFILE_STARTED,
    FETCH_USER_PROFILE_SUCCESS
} from '../types'
import axios from '../../../axios'

export const fetchUserProfile = () => {
    return dispatch => {
        dispatch(fetchUserProfileStarted());
        const token = localStorage.getItem('token')
        axios.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                let currentUser = res.data;
                dispatch(fetchUserProfileSuccess(currentUser));
            })
            .catch(error => {
                dispatch(fetchUserProfileFailure(error.response));
            });
    }
}

const fetchUserProfileStarted = () => {
    return {
        type: FETCH_USER_PROFILE_STARTED
    }
}

const fetchUserProfileSuccess = (currentUser) => {
    return {
        type: FETCH_USER_PROFILE_SUCCESS,
        payload: {
            currentUser
        }
    }
}

const fetchUserProfileFailure = (error) => {
    return {
        type: FETCH_USER_PROFILE_FAILURE,
        payload: {
            error
        }
    }
}