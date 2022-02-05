import {
    FETCH_SINGLE_PRODUCT_FAILURE,
    FETCH_SINGLE_PRODUCT_STARTED,
    FETCH_SINGLE_PRODUCT_SUCCESS,
} from '../types'
import axios from '../../../axios'

export const fetchSingleProduct = (id) => {
    return dispatch => {
        dispatch(fetchSingleProductStarted());
        axios.get(`/products/${id}`)
            .then(res => {
                let product = res.data;
                dispatch(fetchSingleProductSuccess(product));
            })
            .catch(error => {
                dispatch(fetchSingleProductFailure(error.response));
            });
    }
}

const fetchSingleProductStarted = () => {
    return {
        type: FETCH_SINGLE_PRODUCT_STARTED
    }
}

const fetchSingleProductSuccess = (product, id) => {
    return {
        type: FETCH_SINGLE_PRODUCT_SUCCESS,
        payload: {
            product,
            id
        }
    }
}

const fetchSingleProductFailure = (error) => {
    return {
        type: FETCH_SINGLE_PRODUCT_FAILURE,
        payload: {
            error
        }
    }
}