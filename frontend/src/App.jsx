import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Products from "./components/product/products.jsx";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import React, { useEffect, useState } from "react";
import ProductDetails from "./components/product/productDetails.jsx";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import UpdateProfile from "./components/User/updateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import FergotPassword from "./components/User/FergotPassword.jsx";
import ResetPassword from "./components/User/ResetPassword";
import axios from "axios";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import Payment from "./components/cart/Payment.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/orderSuccess";
import MyOrders from "./components/order/MyOrders.jsx";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashbord";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UpdateUser from "./components/admin/UpdateUser";
import UserList from "./components/admin/UserList"
import ProductReviews from "./components/admin/ProductReviews"

function App() {
  const dispatch = useDispatch();
  // const navigator = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setstripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        {/* routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/auth" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<FergotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/*protected routes */}
        {
          <Route
            path="/account"
            element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
          />
        }
        {
          <Route
            path="/me/update"
            element={
              isAuthenticated ? <UpdateProfile /> : <Navigate to="/auth" />
            }
          />
        }
        {
          <Route
            path="/password/update"
            element={
              isAuthenticated ? <UpdatePassword /> : <Navigate to="/auth" />
            }
          />
        }
        {
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/auth" />}
          />
        }
        {
          <Route
            path="/shipping"
            element={isAuthenticated ? <Shipping /> : <Navigate to="/auth" />}
          />
        }
        {
          <Route
            path="/order/confirm"
            element={
              isAuthenticated ? <ConfirmOrder /> : <Navigate to="/auth" />
            }
          />
        }
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              isAuthenticated ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        )}
        <Route
          path="/success"
          element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/auth" />}
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <MyOrders/> : <Navigate to="/auth" />}
        />
        <Route
          path="/order/:id"
          element={isAuthenticated? <OrderDetails/> : <Navigate to="/auth" />}
        />
        {/* admin routes */}
        <Route
          path="/admin/dashboard"
          element={isAuthenticated&&user.role==='admin' ? <Dashboard/> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin/products"
          element={isAuthenticated&&user.role==='admin' ? <ProductList/> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin/product"
          element={isAuthenticated&&user.role==='admin' ? <NewProduct/> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin/product/:id"
          element={isAuthenticated&&user.role==='admin' ? <UpdateProduct/> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin/orders"
          element={isAuthenticated&&user.role==='admin' ? <OrderList/> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin/order/:id"
          element={isAuthenticated&&user.role==='admin' ? <ProcessOrder/> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin/users"
          element={isAuthenticated&&user.role==='admin' ? <UserList/> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin/user/:id"
          element={isAuthenticated&&user.role==='admin' ? <UpdateUser/> : <Navigate to="/auth" />}
        />
          <Route
          path="/admin/reviews"
          element={isAuthenticated&&user.role==='admin' ? <ProductReviews/> : <Navigate to="/auth" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
