import {
    FETCH_USER_PROFILE_FAILURE,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_STARTED,
    FETCH_SINGLE_USER_STARTED,
    FETCH_SINGLE_USER_SUCCESS,
    FETCH_SINGLE_USER_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_STARTED,
    DELETE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS
}
    from '../actions/types'

const initaialState = {
    currentUser: null,
    user: null,
    users: [],
    loading: false,
    error: null,
    success: null
}
const usersReducer = (state = initaialState, action) => {
    switch (action.type) {
        case FETCH_USERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                users: action.payload.users,
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_USER_PROFILE_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                currentUser: action.payload.currentUser,
            };
        case FETCH_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                posts: state.users.filter(user => user._id !== action.payload.id),
                error: null,
                success: action.payload.successMessage
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
                error: null,
                success: action.payload.successMessage
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case FETCH_SINGLE_USER_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload.user,
            };
        case FETCH_SINGLE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.updatedUser,
                error: null,
                success: action.payload.successMessage
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        default:
            return state;
    }
}
export default usersReducer