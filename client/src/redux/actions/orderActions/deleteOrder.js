import { DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE } from '../types'
import axios from '../../../axios'

export const removeOrder = (id) => dispatch => {

    axios.delete(`orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let successMessage = res.data
            dispatch(deleteOrderSuccess(id, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(deleteOrderFailure(error))
        });
}

const deleteOrderSuccess = (id, successOrder) => {
    return {
        type: DELETE_ORDER_SUCCESS,
        payload: {
            id,
            successOrder
        }
    }
}

const deleteOrderFailure = (error) => {
    return {
        type: DELETE_ORDER_FAILURE,
        payload: {
            error
        }
    }
}