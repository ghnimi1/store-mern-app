import { DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from '../types'
import axios from '../../../axios'

export const removeUser = (id) => dispatch => {

    axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let successMessage = res.data
            dispatch(deleteUserSuccess(id, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(deleteUserFailure(error))
        });
}

const deleteUserSuccess = (id, successUser) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: {
            id,
            successUser
        }
    }
}

const deleteUserFailure = (error) => {
    return {
        type: DELETE_USER_FAILURE,
        payload: {
            error
        }
    }
}