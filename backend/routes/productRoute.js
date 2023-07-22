import express from "express";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../utils/util.js";

const router = express.Router();

/**
 * Get a list of products.
 * @route GET /api/products
 * @queryparam {string} category - Filter products by category.
 * @queryparam {string} searchKeyword - Search products by keyword.
 * @queryparam {string} sortOrder - Sort products by price (lowest or highest) or by ID.
 * @returns {object[]} An array of products matching the provided filters and sorted accordingly.
 * @throws {Error} If an error occurs while retrieving the products.
 */
router.get("/", async (req, res) => {
  try {
    const { category, searchKeyword, sortOrder } = req.query;

    const categoryQuery = category ? { category } : {};

    const searchQuery = searchKeyword
      ? { name: { $regex: searchKeyword, $options: "i" } }
      : {};

    const sortQuery = sortOrder === "lowest" ? { price: -1 } : { price: 1 };

    const products = await Product.find({
      ...categoryQuery,
      ...searchQuery,
    }).sort(sortQuery);

    res.send(products);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

/**
 * Retrieve a product by its ID.
 * @route GET /api/products/:productId
 * @param {string} productId - The ID of the product.
 * @returns {object} The product object if found.
 * @throws {Error} If the product is not found or an error occurs during retrieval.
 */
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Add a review to a product.
 * @route POST /api/products/:productId/reviews
 * @param {string} productId - The ID of the product.
 * @bodyparam {string} name - The name of the reviewer.
 * @bodyparam {number} rating - The rating given by the reviewer.
 * @bodyparam {string} comment - The review comment.
 * @returns {object} The newly added review and a success message.
 * @throws {Error} If the product is not found or an error occurs while saving the review.
 */
router.post("/:productId/reviews", isAuth, async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (product) {
      const review = { name, rating, comment };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce(
          (accumulator, currentReview) => currentReview.rating + accumulator,
          0
        ) / product.reviews.length;

      const updatedProduct = await product.save();

      res.status(201).send({
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        message: "Review saved successfully.",
      });
    } else {
      res.status(404).send({ warning: "Product Not Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Update a product by its ID.
 * @route PUT /api/products/:productId
 * @param {string} productId - The ID of the product.
 * @bodyparam {string} name - The updated name of the product.
 * @bodyparam {number} price - The updated price of the product.
 * @bodyparam {string} image - The updated image URL of the product.
 * @bodyparam {string} brand - The updated brand of the product.
 * @bodyparam {string} category - The updated category of the product.
 * @bodyparam {number} countInStock - The updated count of the product in stock.
 * @bodyparam {string} description - The updated description of the product.
 * @returns {object} The updated product object and a success message.
 * @throws {Error} If the product is not found or an error occurs while updating the product.
 */
router.patch("/:productId", isAuth, isAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { updatedProduct: { $eq: req.body } },
      { new: true }
    );
    if (updateProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updateProduct });
    }
    return res.status(500).send({ error: "Error in Updating Product." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
});

/**
 * Delete a product by its ID.
 * @route DELETE /api/products/:id
 * @param {string} id - The ID of the product.
 * @returns {object} A success message if the product is deleted successfully.
 * @throws {Error} If the product is not found or an error occurs while deleting the product.
 */
router.delete("/:productId", isAuth, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );

    if (deletedProduct) {
      res.send({ message: "Product Deleted" });
    }
    res.send({ error: "Error in Deletion." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Create a new product.
 * @route POST /api/products
 * @bodyparam {string} name - The name of the product.
 * @bodyparam {number} price - The price of the product.
 * @bodyparam {string} image - The image URL of the product.
 * @bodyparam {string} brand - The brand of the product.
 * @bodyparam {string} category - The category of the product.
 * @bodyparam {number} countInStock - The count of the product in stock.
 * @bodyparam {string} description - The description of the product.
 * @returns {object} The newly created product and a success message.
 * @throws {Error} If an error occurs while creating the product.
 */
router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);

    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "New Product Created", data: newProduct });
    }
    return res.status(500).send({ error: "Error in Creating Product." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

export default router;
