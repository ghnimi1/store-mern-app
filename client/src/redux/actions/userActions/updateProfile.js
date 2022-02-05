import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from '../types'
import axios from '../../../axios'

export const updateProfile = (user) => dispatch => {

    axios.put(`/users/profile`, user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let updatedProfile = res.data
            let successMessage = res.data
            dispatch(updatedProfileSuccess(updatedProfile, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(updatedProfileFailure(error))
        });
}

const updatedProfileSuccess = (newProfile, successProfile) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: {
            newProfile,
            successProfile
        }
    }
}

const updatedProfileFailure = (error) => {
    return {
        type: UPDATE_PROFILE_FAILURE,
        payload: {
            error
        }
    }
}