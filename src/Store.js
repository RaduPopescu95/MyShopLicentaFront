import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./Reducers/productReducers";
import { cartReducer } from "./Reducers/cartReducers";
import {
  profileThemeReducer,
  updateUserReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducers,
  userProfileUpdateReducer,
  userRegisterReducer,
} from "./Reducers/userReducers";
import {
  orderCreateReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderPayReducer,
  ordersListReducer,
  userOrdersListReducer,
} from "./Reducers/orderReducers";

import { updateTheme } from "./actions/userActions";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,

  cart: cartReducer,

  userLogin: userLoginReducers,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: updateUserReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateProfil: userProfileUpdateReducer,
  userOrders: userOrdersListReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  ordersList: ordersListReducer,
  orderDelivered: orderDeliveredReducer,

  temaProfil: profileThemeReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
