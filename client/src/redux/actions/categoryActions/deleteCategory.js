import { DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE } from '../types'
import axios from '../../../axios'

export const removeCategory = (id) => dispatch => {

    axios.delete(`/category/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let successMessage = res.data
            dispatch(deleteCategorySuccess(id, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(deleteCategoryFailure(error))
        });
}

const deleteCategorySuccess = (id, successCategory) => {
    return {
        type: DELETE_CATEGORY_SUCCESS,
        payload: {
            id,
            successCategory
        }
    }
}

const deleteCategoryFailure = (error) => {
    return {
        type: DELETE_CATEGORY_FAILURE,
        payload: {
            error
        }
    }
}