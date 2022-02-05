import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } from "../types";
import axios from "../../../axios";

export const addProduct = (product) => {
    return dispatch => {
        axios.post('/products', product, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                let successMessage = res.data;
                dispatch(addProductSuccess(product, successMessage));
            })
            .catch(err => {
                let error = err.response;
                dispatch(addProductFailure(error));
            });
    }
};

const addProductSuccess = (product, successMessage) => {
    return {
        type: ADD_PRODUCT_SUCCESS,
        payload: {
            product,
            successMessage
        }
    };
};

const addProductFailure = error => {
    return {
        type: ADD_PRODUCT_FAILURE,
        payload: {
            error
        }
    };
};