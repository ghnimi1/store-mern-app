import {
    FETCH_TOP_PRODUCT_FAILURE,
    FETCH_TOP_PRODUCT_STARTED,
    FETCH_TOP_PRODUCT_SUCCESS,
} from '../types'
import axios from '../../../axios'

export const fetchTopProducts = () => {
    return dispatch => {
        dispatch(fetchTopProductsStarted());
        axios.get(`/products/top`)
            .then(res => {
                let products = res.data;
                dispatch(fetchTopProductsSuccess(products));
            })
            .catch(error => {
                dispatch(fetchTopProductsFailure(error.response));
            });
    }
}

const fetchTopProductsStarted = () => {
    return {
        type: FETCH_TOP_PRODUCT_STARTED
    }
}

const fetchTopProductsSuccess = (products) => {
    return {
        type: FETCH_TOP_PRODUCT_SUCCESS,
        payload: {
            products,
        }
    }
}

const fetchTopProductsFailure = (error) => {
    return {
        type: FETCH_TOP_PRODUCT_FAILURE,
        payload: {
            error
        }
    }
}