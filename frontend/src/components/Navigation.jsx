import React from "react";
import logo from "../assets/images/logo.svg";

// icons
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHome,
} from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";

export const Navigation = () => {
  return (
    <>
      <nav class="bg-white border-gray-200 ">
        <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
          <a href="/" class="flex items-center">
            <img src={logo} class="h-8 mr-3" alt=" Logo" />
          </a>
          <div class="flex items-center md:order-2">
            <a
              href="#"
              class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 "
            >
              <AiOutlineUser size={20} />
            </a>
            <a
              href="#"
              class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2  "
            >
              <AiOutlineShoppingCart size={20} />
            </a>
            <button
              data-collapse-toggle="mega-menu"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              aria-controls="mega-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            id="mega-menu"
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          >
            <ul class="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  id="mega-menu-dropdown-button"
                  data-dropdown-toggle="mega-menu-dropdown"
                  class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 "
                >
                  Categories
                  <svg
                    class="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="mega-menu-dropdown"
                  class="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md "
                >
                  <div class="p-4 pb-0 text-gray-900 md:pb-4 ">
                    <ul
                      class="space-y-4"
                      aria-labelledby="mega-menu-dropdown-button"
                    >
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600">
                          Library
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-gray-500    hover:text-blue-600  "
                        >
                          Resources
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          Pro Version
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="p-4 pb-0 text-gray-900 md:pb-4 ">
                    <ul class="space-y-4">
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          Blog
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          Newsletter
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          Playground
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          License
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="p-4">
                    <ul class="space-y-4">
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          Support Center
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-500  hover:text-blue-600 ">
                          Terms
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 "
                >
                  Deals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 "
                >
                  Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
