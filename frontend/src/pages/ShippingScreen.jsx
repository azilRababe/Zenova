import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

import { Navigation } from "../components/Navigation";
import { Stepper } from "../components/Stepper";
import { Footer } from "../components/Footer";

import { LiaShippingFastSolid } from "react-icons/lia";

export const ShippingScreen = () => {
  const Navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [firstname, set_firstname] = useState("");
  const [lastname, set_lastname] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShipping({ address, city, postalCode, country, firstname, lastname })
    );
    Navigate("/payment");
  };
  return (
    <>
      <Navigation />
      <hr />
      {/* <Stepper />
      <hr /> */}
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 pb-10 pt-16">
        <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 max-w-2xl">
          <div class="w-full pt-1 pb-5">
            <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i class="mdi mdi-credit-card-outline text-3xl">
                <LiaShippingFastSolid />
              </i>
            </div>
          </div>
          <div class="mb-10">
            <h1 class="text-center font-bold text-xl uppercase">
              Secure shipping info
            </h1>
          </div>
          <form class="w-full pt-1 pb-5" onSubmit={submitHandler}>
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  onChange={(e) => set_firstname(e.target.value)}
                />
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                  onChange={(e) => set_lastname(e.target.value)}
                />
              </div>
            </div>

            <div class="-mx-3 md:flex mb-2">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="address"
                >
                  Address
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="address"
                  type="text"
                  placeholder="123 Main St"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="city"
                >
                  City
                </label>
                <div class="relative">
                  <input
                    class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                    id="city"
                    placeholder="Albuquerque"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="postalCode"
                >
                  Postal code
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="postalCode"
                  type="text"
                  placeholder="90210"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="Country"
                >
                  Country
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="Country"
                  type="text"
                  placeholder="United States"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10">
              <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                <i class="mdi mdi-lock-outline mr-1"></i> Continue to payment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
