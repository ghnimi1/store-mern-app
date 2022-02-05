import {
    FETCH_ALL_ORDERS_FAILURE,
    FETCH_ALL_ORDERS_STARTED,
    FETCH_ALL_ORDERS_SUCCESS,
} from '../types'
import axios from '../../../axios'

export const fetchAllOrders = () => {
    return dispatch => {
        dispatch(fetchAllOrdersStarted());
        axios.get(`/orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                let orders = res.data;
                dispatch(fetchAllOrdersSuccess(orders));
            })
            .catch(error => {
                dispatch(fetchAllOrdersFailure(error.response));
            });
    }
}

const fetchAllOrdersStarted = () => {
    return {
        type: FETCH_ALL_ORDERS_STARTED
    }
}

const fetchAllOrdersSuccess = (orders) => {
    return {
        type: FETCH_ALL_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

const fetchAllOrdersFailure = (error) => {
    return {
        type: FETCH_ALL_ORDERS_FAILURE,
        payload: {
            error
        }
    }
}