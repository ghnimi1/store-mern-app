import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from "../types";
import axios from "../../../axios";

export const addCategory = (categ) => {
    return dispatch => {
        axios.post('/category', categ, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(res => {
                let successMessage = res.data;
                dispatch(addCategorySuccess(categ, successMessage));
            })
            .catch(err => {
                let error = err.response;
                dispatch(addCategoryFailure(error));
            });
    }
};

const addCategorySuccess = (categ, successMessage) => {
    return {
        type: ADD_CATEGORY_SUCCESS,
        payload: {
            categ,
            successMessage
        }
    };
};

const addCategoryFailure = error => {
    return {
        type: ADD_CATEGORY_FAILURE,
        payload: {
            error
        }
    };
};