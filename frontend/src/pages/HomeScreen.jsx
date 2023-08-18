import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Jumbotron } from "../components/Jumbotron";
import { Values } from "../components/Values";
import { Blogs } from "../components/Blogs";

import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomeScreen = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 1500,
    cssEase: "linear",
    draggable: true,
    pauseonHover: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };

  const { id } = useParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = id ? id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      <Navigation />
      <Jumbotron />

      {/* {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              plaseholder="Search"
              className=""
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul> */}
      <Values />

      <div className="px-10">
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4"
            >
              <a href={"/product/" + product._id}>
                <img
                  className="w-full rounded-lg"
                  src={product.image}
                  alt="product image"
                />
              </a>
              <a
                href={"/product/" + product._id}
                className="text-xl font-semibold tracking-tight text-gray-900 mt-2 block"
              >
                {product.name}
              </a>
              <div className="flex items-center mt-2">
                {Array.from({ length: product.rating }).map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                <p className="ml-2 text-sm font-bold text-gray-900">
                  {product.rating}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                <span className="text-sm font-medium text-gray-900 hover:underline">
                  {`(${product.numReviews} reviews)`}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Add to Cart
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Blogs />
      <Footer />
    </>
  );
};
