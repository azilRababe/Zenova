import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

import { Rating } from "../components/Rating";
import { Jumbotron } from "../components/Jumbotron";

import { BsFillCaretDownFill, BsSearch } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { Pagination } from "../components/Pagination";
import { Dropdown } from "../components/Dropdown";
import { Searchbar } from "../components/Searchbar";

export const HomeScreen = (props) => {
  const { id } = useParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  // const category = props.match.params.id ? props.match.params.id : "";
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
      <Jumbotron />
      <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 "
        >
          All categories
        </button>
        <button
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200  bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 "
        >
          Food & Drinks
        </button>
        <button
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200   bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 "
        >
          Health & Beauty
        </button>
        <button
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200   bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 "
        >
          Home & Lifestyle
        </button>
      </div>
      <div className="flex justify-around mb-5 flex-wrap content-center">
        <div>
          <Searchbar />
        </div>
        <div>
          <Dropdown />
        </div>
      </div>
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

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="products gap-4 ">
          {products.map((product) => (
            // <li key={product._id}>
            //   <div className="product">
            //     <Link to={"/product/" + product._id}>
            //       <img
            //         className="product-image"
            //         src={product.image}
            //         alt="product"
            //       />
            //     </Link>
            //     <div className="product-name">
            //       <Link to={"/product/" + product._id}>{product.name}</Link>
            //     </div>
            //     <div className="product-brand">{product.brand}</div>
            //     <div className="product-price">${product.price}</div>
            //     <div className="product-rating">
            //       <Rating
            //         value={product.rating}
            //         text={product.numReviews + " reviews"}
            //       />
            //     </div>
            //   </div>
            // </li>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
              <a href={"/product/" + product._id}>
                <img
                  class="p-8 rounded-t-lg"
                  src={product.image}
                  alt="product image"
                />
              </a>
              <div class="px-5 pb-5">
                <a href={"/product/" + product._id}>
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">
                    {product.name}
                  </h5>
                </a>
                {/* rating */}

                <div class="flex items-center">
                  {(() => {
                    const stars = [];
                    for (let i = 0; i < product.rating; i++) {
                      stars.push(
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-300 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      );
                    }
                    return stars;
                  })()}

                  <p class="ml-2 text-sm font-bold text-gray-900 ">
                    {product.rating}
                  </p>
                  <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full "></span>
                  <span class="text-sm font-medium text-gray-900  hover:underline ">
                    {`(${product.numReviews} reviews)`}
                  </span>
                </div>

                {/* rating */}
                <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900 ">
                    ${product.price}
                  </span>
                  <a
                    href="#"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination />
    </>
  );
};
