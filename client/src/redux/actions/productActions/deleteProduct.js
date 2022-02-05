import { DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE } from '../types'
import axios from '../../../axios'

export const removeProduct = (id) => dispatch => {

    axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let successMessage = res.data
            dispatch(deleteProductSuccess(id, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(deleteProductFailure(error))
        });
}

const deleteProductSuccess = (id, successProduct) => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        payload: {
            id,
            successProduct
        }
    }
}

const deleteProductFailure = (error) => {
    return {
        type: DELETE_PRODUCT_FAILURE,
        payload: {
            error
        }
    }
}