import {
    FETCH_ALL_PRODUCT_FAILURE,
    FETCH_ALL_PRODUCT_STARTED,
    FETCH_ALL_PRODUCT_SUCCESS,
} from '../types'
import axios from '../../../axios'

export const fetchAllProducts = (keyword = '', pageNumber = '') => {
    return dispatch => {
        dispatch(fetchAllProductsStarted());
        axios.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`)
            .then(res => {
                let products = res.data;
                dispatch(fetchAllProductsSuccess(products));
            })
            .catch(error => {
                dispatch(fetchAllProductsFailure(error.response));
            });
    }
}

const fetchAllProductsStarted = () => {
    return {
        type: FETCH_ALL_PRODUCT_STARTED
    }
}

const fetchAllProductsSuccess = (products, keyword, pageNumber) => {
    return {
        type: FETCH_ALL_PRODUCT_SUCCESS,
        payload: {
            products,
            keyword,
            pageNumber
        }
    }
}

const fetchAllProductsFailure = (error) => {
    return {
        type: FETCH_ALL_PRODUCT_FAILURE,
        payload: {
            error
        }
    }
}