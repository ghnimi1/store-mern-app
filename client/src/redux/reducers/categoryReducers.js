import {
    FETCH_ALL_CATEGORY_STARTED,
    FETCH_ALL_CATEGORY_SUCCESS,
    FETCH_ALL_CATEGORY_FAILURE,
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_SUCCESS
} from '../actions/types'

const initaialState = {
    category: [],
    loading: false,
    error: null,
    success: null
}
const categoryReducers = (state = initaialState, action) => {
    switch (action.type) {
        case FETCH_ALL_CATEGORY_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                category: action.payload.category,
            };
        case FETCH_ALL_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                category: state.category.filter(categ => categ._id !== action.payload.id),
                error: null,
                success: action.payload.successMessage
            };
        case DELETE_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload.updatedCategory,
                error: null,
                success: action.payload.successMessage
            };
        case UPDATE_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                category: [action.payload.categ, ...state.category],
                error: null,
                success: action.payload.successMessage
            };
        case ADD_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        default:
            return state;
    }
}
export default categoryReducers