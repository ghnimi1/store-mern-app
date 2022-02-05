import { UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE } from '../types'
import axios from '../../../axios'

export const updateCategory = (id, categ) => dispatch => {

    axios.put(`/category/${id}`, categ, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
    )
        .then(res => {
            let updatedCategory = res.data
            let successMessage = res.data
            dispatch(updatedCategorySuccess(updatedCategory, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(updatedCategoryFailure(error))
        });
}

const updatedCategorySuccess = (newCategory, successCategory) => {
    return {
        type: UPDATE_CATEGORY_SUCCESS,
        payload: {
            newCategory,
            successCategory
        }
    }
}

const updatedCategoryFailure = (error) => {
    return {
        type: UPDATE_CATEGORY_FAILURE,
        payload: {
            error
        }
    }
}