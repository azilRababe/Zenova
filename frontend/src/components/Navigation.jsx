import React from "react";
import logo from "../assets/images/logo.svg";
import { MdOutlineManageAccounts, MdOutlineShoppingCart } from "react-icons/md";

export const Navigation = () => {
  const expandMenu = () => {
    const menu = document.getElementById("mega-menu-full-dropdown");
    menu.classList.toggle("hidden");
  };

  return (
    <>
      <div className="">
        {/* <span className="flex justify-center align-middle bg-dark text-white py-2 text-sm ">
          Discover Tranquility Through Organic Living
        </span> */}
        <div className="nav py-2">
          <nav class="border-gray-200 bg-white">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 ">
              <a href="/" class="flex items-center">
                <img src={logo} class="h-8 mr-3" alt="Flowbite Logo" />
              </a>
              <button
                onClick={expandMenu}
                data-collapse-toggle="mega-menu-full"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
                aria-controls="mega-menu-full"
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
              <div
                x-show="open"
                id="mega-menu-full"
                class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1"
              >
                <ul class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                  <li>
                    <a
                      href="/"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={expandMenu}
                      id="mega-menu-full-dropdown-button"
                      data-collapse-toggle="mega-menu-full-dropdown"
                      class="flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 "
                    >
                      Shop{" "}
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
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                    >
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                    >
                      Recipes
                    </a>
                  </li>

                  <li>
                    <a
                      href="/signin"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                    >
                      <MdOutlineManageAccounts size={20} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                    >
                      <MdOutlineShoppingCart size={20} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              id="mega-menu-full-dropdown"
              class="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y hidden "
            >
              <div class="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900  sm:grid-cols-2 md:px-6">
                <ul>
                  <li>
                    <a href="#" class="block p-3 rounded-lg hover:bg-gray-100 ">
                      <div class="font-semibold">
                        Organic Matcha Green Tea Powder
                      </div>
                      <span class="text-sm text-gray-500 ">
                        Energize your mornings with our Organic Matcha Green Tea
                        Powder. Packed with antioxidants, this vibrant green
                        powder offers a natural boost of energy and a calming
                        ritual all in one sip.
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block p-3 rounded-lg hover:bg-gray-100 ">
                      <div class="font-semibold">
                        Himalayan Pink Salt Body Scrub{" "}
                      </div>
                      <span class="text-sm text-gray-500 ">
                        Indulge in the luxury of our Himalayan Pink Salt Body
                        Scrub. Gently exfoliate and rejuvenate your skin with
                        the power of mineral-rich pink salt, leaving behind a
                        silky, soft glow.
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block p-3 rounded-lg hover:bg-gray-100 ">
                      <div class="font-semibold">Organic Chia Seeds</div>
                      <span class="text-sm text-gray-500 ">
                        Elevate your nutrition with our Organic Chia Seeds.
                        These tiny powerhouses are rich in omega-3s, fiber, and
                        protein, making them a versatile addition to your
                        smoothies, yogurts, and more.
                      </span>
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#" class="block p-3 rounded-lg hover:bg-gray-100 ">
                      <div class="font-semibold">Organic Chia Seeds</div>
                      <span class="text-sm text-gray-500 ">
                        Elevate your nutrition with our Organic Chia Seeds.
                        These tiny powerhouses are rich in omega-3s, fiber, and
                        protein, making them a versatile addition to your
                        smoothies, yogurts, and more.
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block p-3 rounded-lg hover:bg-gray-100 ">
                      <div class="font-semibold">Organic Quinoa Pasta</div>
                      <span class="text-sm text-gray-500 ">
                        Discover guilt-free indulgence with our Organic Quinoa
                        Pasta. Packed with protein and fiber, this pasta
                        alternative offers a delicious way to fuel your body.
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block p-3 rounded-lg hover:bg-gray-100 ">
                      <div class="font-semibold">Organic Coconut Oil</div>
                      <span class="text-sm text-gray-500 ">
                        Experience the versatility of our Organic Coconut Oil.
                        From cooking to moisturizing, this multipurpose oil is a
                        natural source of healthy fats and nourishment.
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
