import { ADD_REVIEWS_SUCCESS, ADD_REVIEWS_FAILURE } from "../types";
import axios from "../../../axios";

export const addReviews = (id, reviews) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    return dispatch => {
        axios.post(`/products/${id}/reviews`, reviews, options)
            .then(res => {
                let successMessage = res.data;
                dispatch(addReviewsSuccess(reviews, successMessage));
            })
            .catch(err => {
                let error = err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg;
                dispatch(addReviewsFailure(error));
            });
    }
};

const addReviewsSuccess = (reviews, successMessage) => {
    return {
        type: ADD_REVIEWS_SUCCESS,
        payload: {
            reviews,
            successMessage
        }
    };
};

const addReviewsFailure = error => {
    return {
        type: ADD_REVIEWS_FAILURE,
        payload: {
            error
        }
    };
};