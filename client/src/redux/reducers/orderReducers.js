import {
    ADD_ORDER_FAILURE,
    ADD_ORDER_SUCCESS,
    FETCH_SINGLE_ORDER_STARTED,
    FETCH_SINGLE_ORDER_SUCCESS,
    FETCH_SINGLE_ORDER_FAILURE,
    FETCH_ALL_ORDERS_STARTED,
    FETCH_ALL_ORDERS_SUCCESS,
    FETCH_ALL_ORDERS_FAILURE,
    FETCH_MY_ORDERS_STARTED,
    FETCH_MY_ORDERS_SUCCESS,
    FETCH_MY_ORDERS_FAILURE,
    UPDATE_ORDER_DELIVERED_SUCCESS,
    UPDATE_ORDER_DELIVERED_FAILURE,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_SUCCESS,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAILURE
}
    from '../actions/types'

const initaialState = {
    order: {},
    orders: null,
    loading: false,
    error: null,
    success: null
}
const ordersReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload,
                error: null,
                success: action.payload.successMessage
            };
        case ADD_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case FETCH_SINGLE_ORDER_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_SINGLE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                order: action.payload.order
            };
        case FETCH_SINGLE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_ALL_ORDERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload.orders
            };
        case FETCH_ALL_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_MY_ORDERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_MY_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload.orders
            };
        case FETCH_MY_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case UPDATE_ORDER_DELIVERED_SUCCESS:
            return {
                ...state,
                order: action.payload.id,
                error: null,
                success: action.payload.successMessage
            };
        case UPDATE_ORDER_DELIVERED_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case PAY_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload.id,
                error: null,
                success: action.payload.successMessage
            };
        case PAY_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.payload.id),
                error: null,
                success: action.payload.successOrder
            };
        case DELETE_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        default:
            return state;
    }
}
export default ordersReducer