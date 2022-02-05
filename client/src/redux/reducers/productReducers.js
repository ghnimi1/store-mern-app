import {
    FETCH_ALL_PRODUCT_STARTED,
    FETCH_ALL_PRODUCT_SUCCESS,
    FETCH_ALL_PRODUCT_FAILURE,
    FETCH_TOP_PRODUCT_STARTED,
    FETCH_TOP_PRODUCT_SUCCESS,
    FETCH_TOP_PRODUCT_FAILURE,
    FETCH_SINGLE_PRODUCT_FAILURE,
    FETCH_SINGLE_PRODUCT_STARTED,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    ADD_REVIEWS_FAILURE,
    ADD_REVIEWS_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_SUCCESS
}
    from '../actions/types'

const initaialState = {
    pages: null,
    page: null,
    product: null,
    products: [],
    loading: false,
    error: null,
    success: null
}
const productsReducer = (state = initaialState, action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCT_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case FETCH_ALL_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_TOP_PRODUCT_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_TOP_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                topProducts: action.payload.products,
            };
        case FETCH_TOP_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_SINGLE_PRODUCT_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                product: action.payload.product
            };
        case FETCH_SINGLE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                prducts: state.products.filter(product => product._id !== action.payload.id),
                error: null,
                success: action.payload.successMessage
            };
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload.updatedProduct,
                error: null,
                success: action.payload.successMessage
            };
        case UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [action.payload.product, ...state.products],
                error: null,
                success: action.payload.successMessage
            };
        case ADD_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case ADD_REVIEWS_SUCCESS:
            return {
                ...state,
                products: [action.payload.reviews, ...state.products],
                error: null,
                success: action.payload.successMessage
            };
        case ADD_REVIEWS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        default:
            return state;
    }
}
export default productsReducer