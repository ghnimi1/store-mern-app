import { combineReducers } from "redux";
import authReducer from "./authReducers";
import usersReducer from "./userReducer";
import productsReducer from "./productReducers";
import orderReducer from "./orderReducers";
import cartReducer from "./cartReducers";
import categoryReducers from "./categoryReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
    orders: orderReducer,
    cart: cartReducer,
    category: categoryReducers
});

export default rootReducer;