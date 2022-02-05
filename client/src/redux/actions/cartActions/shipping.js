import { SHIPPING_ADDRESS } from "../types";

export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}
