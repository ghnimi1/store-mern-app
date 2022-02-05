import {
    FETCH_SINGLE_ORDER_FAILURE,
    FETCH_SINGLE_ORDER_STARTED,
    FETCH_SINGLE_ORDER_SUCCESS,
} from '../types'
import axios from '../../../axios'

export const fetchSingleOrder = (id) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    return dispatch => {
        dispatch(fetchSingleOrderStarted());
        axios.get(`/orders/${id}`, options)
            .then(res => {
                let order = res.data;
                dispatch(fetchSingleOrderSuccess(order));
            })
            .catch(error => {
                dispatch(fetchSingleOrderFailure(error.response));
            });
    }
}

const fetchSingleOrderStarted = () => {
    return {
        type: FETCH_SINGLE_ORDER_STARTED
    }
}

const fetchSingleOrderSuccess = (order, id) => {
    return {
        type: FETCH_SINGLE_ORDER_SUCCESS,
        payload: {
            order,
            id
        }
    }
}

const fetchSingleOrderFailure = (error) => {
    return {
        type: FETCH_SINGLE_ORDER_FAILURE,
        payload: {
            error
        }
    }
}