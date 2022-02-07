import React, { useEffect } from "react";
import { Container, InputGroup, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UserListScreen from "./screens/UserListScreen";

// import history from './components/History'

function App() {
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const temaProfil = useSelector((state) => state.temaProfil);
  const { dark, light } = temaProfil;
  const { userInfo: isAuth } = userLogin;
  const bg = localStorage.getItem("bg");

  useEffect(() => {
    if (dark || bg == "dark-content") {
      document.body.classList.add("black-content");
    } else {
      document.body.classList.remove("black-content");
    }
  }, [dark, light]);

  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />

            <Route
              path="/shipping"
              element={
                isAuth ? (
                  <ShippingScreen />
                ) : (
                  <Navigate to="/login" replace state={{ from: location }} />
                )
              }
            />

            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderDetailsScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
    // </Router>
  );
}

export default App;
