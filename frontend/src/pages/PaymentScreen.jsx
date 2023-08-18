import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

import { Navigation } from "../components/Navigation";
import { Stepper } from "../components/Stepper";

export const PaymentScreen = () => {
  const Navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    Navigate("placeorder");
  };

  return (
    <>
      <Navigation />
      <div className="bg-light h-screen">
        <Stepper />
        <div>
          {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
          <div className="form">
            <form onSubmit={submitHandler}>
              <ul className="form-container">
                <li>
                  <h2>Payment</h2>
                </li>

                <li>
                  <div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentMethod"
                      value="paypal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label for="paymentMethod">Paypal</label>
                  </div>
                </li>

                <li>
                  <button type="submit" className="button primary">
                    Continue
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
