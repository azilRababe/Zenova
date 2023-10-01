import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";

import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export const RegisterScreen = () => {
  const Navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/";
  const redirect = params.redirect || "/";

  useEffect(() => {
    if (userInfo) {
      Navigate(redirect);
    }
    return () => {
      //
    };
  }, [userInfo, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <>
      <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 class="text-2xl font-semibold mb-6">Sign Up</h2>
          <form onSubmit={submitHandler}>
            <div class="mb-4">
              <label
                for="name"
                class="block text-gray-700 text-sm font-medium mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block text-gray-700 text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p class="text-gray-600 text-sm mt-4">
            Already have an account?
            <a
              href={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
              class="text-blue-500 hover:underline mx-2"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
