import React from "react";

export const Jumbotron = () => {
  return (
    <section class="bg-center bg-no-repeat bg-[url('https://shorturl.at/sBIZ7')] bg-gray-700 bg-blend-multiply bg-cover bg-fixed">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 content-center">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Nurture Your Inner Harmony
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Discover Organic Bliss and Elevate Your Lifestyle with Thoughtfully
          Curated Products Rooted in Nature's Wisdom
        </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="/products"
            class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};
