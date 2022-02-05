import { ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE } from "../types";
import axios from "../../../axios";

export const addOrder = (order) => async (dispatch, getState) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }

        const { data } = await axios.post(`/orders`, order, config)

        dispatch({
            type: ADD_ORDER_SUCCESS,
            payload: data,
        })

        localStorage.removeItem('cartItems')
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

    }
}

/* export const addOrder = (order) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    return dispatch => {
        axios.post(`/orders`, order, options)
            .then(res => {
                let successMessage = res.data;
                dispatch(addOrderSuccess(order, successMessage));
            })
            .catch(err => {
                let error = err.response;
                dispatch(addOrderFailure(error));
            });
    }
};

const addOrderSuccess = (order, successMessage) => {
    return {
        type: ADD_ORDER_SUCCESS,
        payload: {
            order,
            successMessage
        }
    };
};

const addOrderFailure = error => {
    return {
        type: ADD_ORDER_FAILURE,
        payload: {
            error
        }
    };
}; */