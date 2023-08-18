import React from "react";

import { BsFillBalloonHeartFill } from "react-icons/bs";
export const Footer = () => {
  return (
    <footer class="flex justify-center items-end min-h-fit bg-white">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between font-bold tracking-wider">
        <span class="text-sm text-gray-500 sm:text-center flex flex-row">
          Made with{" "}
          <BsFillBalloonHeartFill className=" text-red-600 font-bold text-xl mx-2" />
          and Purrfection By{" "}
          <a href="#" class="hover:underline ml-1">
            azil Rababe™
          </a>
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm sm:mt-0 font-bold tracking-wider">
          <li>
            <a
              href="https://github.com/azilRababe"
              class="mr-4 hover:underline md:mr-6 "
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/azilrababe/"
              class="mr-4 hover:underline md:mr-6"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:azilrababe@gmail.com" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
