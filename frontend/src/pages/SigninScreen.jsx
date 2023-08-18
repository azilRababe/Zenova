import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

export const SigninScreen = (props) => {
  const Navigate = useNavigate();
  const params = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/";
  // const redirect = params.redirect || "/";

  useEffect(() => {
    if (userInfo) {
      Navigate("/");
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        <form onSubmit={submitHandler}>
          <div class="mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-medium mb-1"
            >
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p class="text-gray-600 text-sm mt-4 text-center">
          Don't have an account?
          <a href="/register" class="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
