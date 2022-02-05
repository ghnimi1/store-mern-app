import {
    FETCH_MY_ORDERS_FAILURE,
    FETCH_MY_ORDERS_STARTED,
    FETCH_MY_ORDERS_SUCCESS,
} from '../types'
import axios from '../../../axios'

export const fetchMyOrders = () => {
    return dispatch => {
        dispatch(fetchMyOrdersStarted());
        axios.get(`/orders/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                let orders = res.data;
                dispatch(fetchMyOrdersSuccess(orders));
            })
            .catch(error => {
                dispatch(fetchMyOrdersFailure(error.response));
            });
    }
}

const fetchMyOrdersStarted = () => {
    return {
        type: FETCH_MY_ORDERS_STARTED
    }
}

const fetchMyOrdersSuccess = (orders) => {
    return {
        type: FETCH_MY_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

const fetchMyOrdersFailure = (error) => {
    return {
        type: FETCH_MY_ORDERS_FAILURE,
        payload: {
            error
        }
    }
}