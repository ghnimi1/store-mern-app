import { PAY_ORDER_SUCCESS, PAY_ORDER_FAILURE } from '../types'
import axios from '../../../axios'

export const payOrder = (id, paymentResult) => dispatch => {

    axios.put(`/orders/${id}/paid`, paymentResult, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let successMessage = res.data
            dispatch(payOrderSuccess(id, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(payOrderFailure(error))
        });
}

const payOrderSuccess = (id, successOrder) => {
    return {
        type: PAY_ORDER_SUCCESS,
        payload: {
            id,
            successOrder
        }
    }
}

const payOrderFailure = (error) => {
    return {
        type: PAY_ORDER_FAILURE,
        payload: {
            error
        }
    }
}