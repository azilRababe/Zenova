import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export const ProductScreen = () => {
  const Navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    Navigate("/cart/" + id + "?qty=" + qty);
  };

  return (
    <>
      <Navigation />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (
          <>
            <div class="bg-gray-100 p-6 shadow-md md:p-10 lg:px-16 xl:px-20">
              <h1 class="mb-4 text-3xl font-semibold">{product.name}</h1>
              <div class="mb-6 flex items-center">
                <div class="flex items-center">
                  <span class="mr-1 text-yellow-400">&#9733;</span>
                  <span class="text-gray-600">{product.rating}</span>
                </div>
                <div class="ml-4 text-gray-600">
                  ({product.numReviews} Reviews)
                </div>
              </div>
              <div class="container mx-auto">
                <div class="flex flex-col gap-8 md:flex-row">
                  <div class="md:w-1/2">
                    {/* <!-- Product Image --> */}
                    <img
                      src={product.image}
                      alt="Product Image"
                      class="w-full rounded-lg shadow-md"
                    />
                  </div>
                  <div class="space-y-4 md:w-1/2">
                    <small class="ml-2 font-semibold text-gray-500 ">
                      {product.countInStock > 0 ? "In Stock" : "Unavailable."}
                    </small>
                    {/* <!-- Product Description --> */}
                    <p class="text-gray-600">{product.description}</p>
                    {/* <!-- Product Price --> */}
                    <p class="text-2xl font-semibold">{`$${product.price}`} </p>
                    {/* <!-- Add to Cart Button --> */}
                    {product.countInStock > 0 && (
                      <button
                        class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
                <hr class="my-8" />
                <div class="mb-8">
                  <h2 class="mb-4 text-2xl font-semibold">Customer Reviews</h2>
                  {!product.reviews.length && <div>There is no review</div>}
                  <div class="grid grid-cols-2 gap-5">
                    {/* <!-- Review Card 1 --> */}
                    {product.reviews.map((review) => (
                      <div
                        class="rounded-lg bg-white p-4 shadow-md md:p-6"
                        key={review._id}
                      >
                        <div class="mb-2 flex items-center">
                          {Array.from({ length: review.rating }).map(
                            (_, index) => (
                              <div key={index} className="mr-1 text-yellow-400">
                                &#9733;
                              </div>
                            )
                          )}
                          <div class="font-semibold text-gray-700">
                            {review.name}
                          </div>
                        </div>
                        <p class="text-gray-600">{`${review.comment}...`}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div class="text-center">
                  <a href="#" class="text-blue-500 hover:underline">
                    See All Reviews
                  </a>
                </div>

                <h3 class="text-xl font-semibold mb-3">Write a Review</h3>
                {/* Add Review */}
                {userInfo ? (
                  <div class="bg-gray-100 p-6 md:p-10 lg:px-16 xl:px-20">
                    <div class="mb-8">
                      <div class="bg-white rounded-lg p-4 md:p-6 shadow-md">
                        <h3 class="text-xl font-semibold mb-3">
                          Write a Review
                        </h3>
                        <form
                          action="#"
                          method="post"
                          class="space-y-4"
                          onSubmit={submitHandler}
                        >
                          <div class="flex items-center">
                            <label for="rating" class="mr-2">
                              Rating:
                            </label>
                            <select
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                              name="rating"
                              id="rating"
                              class="border rounded-md py-1 px-2"
                            >
                              <option value="5">5 Stars</option>
                              <option value="4">4 Stars</option>
                              <option value="3">3 Stars</option>
                              <option value="2">2 Stars</option>
                              <option value="1">1 Star</option>
                            </select>
                          </div>

                          <div>
                            <label for="review" class="block">
                              Your Review:
                            </label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              id="review"
                              name="review"
                              rows="4"
                              class="w-full border rounded-md py-1 px-2"
                              placeholder="Write your review here..."
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                          >
                            Submit Review
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-gray-600">
                      Please{" "}
                      <a to="/signin" className="text-blue-500 hover:underline">
                        Sign-in
                      </a>
                      to write a review.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
