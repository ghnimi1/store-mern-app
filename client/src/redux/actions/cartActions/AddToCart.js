import { ADD_TO_CART_SUCCESS } from "../types";
import axios from "../../../axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    const { data } = await axios.get(`/products/${id}`, options)

    dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}