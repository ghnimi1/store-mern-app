import { UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from '../types'
import axios from '../../../axios'

export const updateUser = (id, user) => dispatch => {

    axios.put(`/users/${id}`, user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let updatedUser = res.data
            let successMessage = res.data
            dispatch(updatedUserSuccess(updatedUser, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(updatedUserFailure(error))
        });
}

const updatedUserSuccess = (newUser, successUser) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: {
            newUser,
            successUser
        }
    }
}

const updatedUserFailure = (error) => {
    return {
        type: UPDATE_USER_FAILURE,
        payload: {
            error
        }
    }
}