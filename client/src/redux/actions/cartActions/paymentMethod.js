import { PAYMENT_METHOD } from "../types";

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', data)
}
