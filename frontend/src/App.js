import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeScreen } from "./pages/HomeScreen";
import { ProductScreen } from "./pages/ProductScreen";
import { CartScreen } from "./pages/CartScreen";
import { SigninScreen } from "./pages/SigninScreen";
import { RegisterScreen } from "./pages/RegisterScreen";
import { ProductsScreen } from "./pages/ProductsScreen";
import { ShippingScreen } from "./pages/ShippingScreen";
import { PaymentScreen } from "./pages/PaymentScreen";
import { PlaceOrderScreen } from "./pages/PlaceOrderScreen";
import { OrderScreen } from "./pages/OrderScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { OrdersScreen } from "./pages/OrdersScreen";

import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/category/:id" element={<HomeScreen />} />
        <Route path="/" exact={true} element={<HomeScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
