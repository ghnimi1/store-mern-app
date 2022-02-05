import { UPDATE_ORDER_DELIVERED_SUCCESS, UPDATE_ORDER_DELIVERED_FAILURE } from '../types'
import axios from '../../../axios'

export const updateOrderToDelivered = (id) => dispatch => {

    axios.put(`/orders/${id}/delivered`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let successMessage = res.data
            dispatch(updatedOrderSuccess(id, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(updatedOrderFailure(error))
        });
}

const updatedOrderSuccess = (id, successOrder) => {
    return {
        type: UPDATE_ORDER_DELIVERED_SUCCESS,
        payload: {
            id,
            successOrder
        }
    }
}

const updatedOrderFailure = (error) => {
    return {
        type: UPDATE_ORDER_DELIVERED_FAILURE,
        payload: {
            error
        }
    }
}