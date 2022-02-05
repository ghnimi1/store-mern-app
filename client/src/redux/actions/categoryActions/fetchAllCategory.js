import {
    FETCH_ALL_CATEGORY_FAILURE,
    FETCH_ALL_CATEGORY_STARTED,
    FETCH_ALL_CATEGORY_SUCCESS,
} from '../types'
import axios from '../../../axios'

export const fetchAllCategory = () => {
    return dispatch => {
        dispatch(fetchAllCategoryStarted());
        axios.get(`/category`)
            .then(res => {
                let category = res.data;
                dispatch(fetchAllCategorySuccess(category));
            })
            .catch(error => {
                dispatch(fetchAllCategoryFailure(error.response));
            });
    }
}

const fetchAllCategoryStarted = () => {
    return {
        type: FETCH_ALL_CATEGORY_STARTED
    }
}

const fetchAllCategorySuccess = (category) => {
    return {
        type: FETCH_ALL_CATEGORY_SUCCESS,
        payload: {
            category,
        }
    }
}

const fetchAllCategoryFailure = (error) => {
    return {
        type: FETCH_ALL_CATEGORY_FAILURE,
        payload: {
            error
        }
    }
}