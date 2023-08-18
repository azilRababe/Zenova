// import React from "react";

// export const CheckoutSteps = (props) => {
//   return (
//     <div className="checkout-steps">
//       <div className={props.step1 ? "active" : ""}>Signin</div>
//       <div className={props.step2 ? "active" : ""}>Shipping</div>
//       <div className={props.step3 ? "active" : ""}>Payment</div>
//       <div className={props.step4 ? "active" : ""}>Place Order</div>
//     </div>
//   );
// };
import React from "react";
import { useLocation } from "react-router-dom";

export const CheckoutSteps = () => {
  const location = useLocation();

  // Define an array of step names
  const stepNames = ["Signin", "Shipping", "Payment", "Place Order"];

  return (
    <div className="checkout-steps">
      {stepNames.map((step, index) => (
        <div
          key={index}
          className={
            location.pathname.includes(step.toLowerCase()) ? "active" : ""
          }
        >
          {step}
        </div>
      ))}
    </div>
  );
};
