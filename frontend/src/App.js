import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
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
import Typography from "@mui/material/Typography";
import { Navigation } from "./components/Navigation";

import { BsFillBalloonHeartFill } from "react-icons/bs";

import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";

export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="main">
        <div className="content">
          <Route path="/orders" component={OrdersScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/category/:id" component={HomeScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
        </div>
      </main>

      <Divider variant="middle" textAlign="center" />

      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography variant="h5" gutterBottom align="center">
          Made With
          <BsFillBalloonHeartFill color="red" />
          And Purrfection
        </Typography>
      </Box>
    </BrowserRouter>
  );
};
