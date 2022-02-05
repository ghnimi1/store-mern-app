import {
    ADD_TO_CART_SUCCESS,
    CART_REMOVE_ITEM,
    SHIPPING_ADDRESS,
    PAYMENT_METHOD
} from '../actions/types'

const cartReducer = (
    state = { cartItems: [], shippingAddress: {}, paymentMethod: '' },
    action
) => {
    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            const item = action.payload

            const existItem = state.cartItems.find((x) => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload),
            }
        case SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}
export default cartReducer