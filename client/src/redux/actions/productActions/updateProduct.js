import { UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE } from '../types'
import axios from '../../../axios'

export const updateProduct = (id, product) => dispatch => {

    axios.put(`/products/${id}`, product, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    )
        .then(res => {
            let updatedProduct = res.data
            let successMessage = res.data
            dispatch(updatedProductSuccess(updatedProduct, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(updatedProductFailure(error))
        });
}

const updatedProductSuccess = (newProduct, successProduct) => {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        payload: {
            newProduct,
            successProduct
        }
    }
}

const updatedProductFailure = (error) => {
    return {
        type: UPDATE_PRODUCT_FAILURE,
        payload: {
            error
        }
    }
}