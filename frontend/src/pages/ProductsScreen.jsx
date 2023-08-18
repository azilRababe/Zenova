import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from "../actions/productActions";

import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export const ProductsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <>
      <Navigation />
      <div className="container mx-auto my-5">
        {/* Modal toggle */}
        <div className="flex justify-between mb-5">
          <p className="text-2xl">Products</p>

          <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            type="button"
            onClick={() => openModal({})}
          >
            Add Product
          </button>
        </div>

        {modalVisible && (
          <div
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <form onSubmit={submitHandler}>
                  <ul className="form-container">
                    <li>
                      <h2>Create Product</h2>
                    </li>
                    <li>
                      {loadingSave && <div>Loading...</div>}
                      {errorSave && <div>{errorSave}</div>}
                    </li>

                    <li>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="price">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={price}
                        id="price"
                        onChange={(e) => setPrice(e.target.value)}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="image">Image</label>
                      <input
                        type="text"
                        name="image"
                        value={image}
                        id="image"
                        onChange={(e) => setImage(e.target.value)}
                      ></input>
                      <input type="file" onChange={uploadFileHandler}></input>
                      {uploading && <div>Uploading...</div>}
                    </li>
                    <li>
                      <label htmlFor="brand">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={brand}
                        id="brand"
                        onChange={(e) => setBrand(e.target.value)}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="countInStock">CountInStock</label>
                      <input
                        type="text"
                        name="countInStock"
                        value={countInStock}
                        id="countInStock"
                        onChange={(e) => setCountInStock(e.target.value)}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="name">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={category}
                        id="category"
                        onChange={(e) => setCategory(e.target.value)}
                      ></input>
                    </li>
                    <li>
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        value={description}
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </li>
                    <li>
                      <button type="submit" className="button primary">
                        {id ? "Update" : "Create"}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setModalVisible(false)}
                        className="button secondary"
                      >
                        Back
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="bg-white border-b">
                  <td className="px-6 py-4">{product._id}</td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4 space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-600 hover:underline"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="text-red-500 hover:text-red-600 hover:underline"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
