import express from "express";
import Order from "../models/orderModel.js";
import { isAuth, isAdmin } from "../utils/util.js";

const router = express.Router();

/**
 * Get a list of orders.
 * @route GET /api/orders
 * @returns {object[]} An array of orders with associated user information.
 * @throws {Error} If an error occurs while retrieving the orders.
 */
router.get("/", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user");
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Get a list of orders for the authenticated user.
 * @route GET /api/orders/mine
 * @returns {object[]} An array of orders belonging to the authenticated user.
 * @throws {Error} If an error occurs while retrieving the orders.
 */
router.get("/mine", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Get an order by its ID.
 * @route GET /api/orders/:orderId
 * @param {string} orderId - The ID of the order.
 * @returns {object} The order object if found.
 * @throws {Error} If the order is not found or an error occurs while retrieving the order.
 */
router.get("/:orderId", isAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId });
    if (order) {
      res.send(order);
    }
    res.status(404).send({ warning: "Order Not Found." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Delete an order by its ID.
 * @route DELETE /api/orders/:id
 * @param {string} orderID - The ID of the order.
 * @returns {object} The deleted order object if found.
 * @throws {Error} If the order is not found or an error occurs while deleting the order.
 */
router.delete("/:orderId", isAuth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.orderId });
    if (order) {
      res.send({
        message: "Order Deleted Successfuly ",
        deletedOrder,
      });
    }
    res.status(404).send({ warning: "Order Not Found." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Create a new order.
 * @route POST /api/orders
 * @bodyparam {object[]} orderItems - An array of order items.
 * @bodyparam {string} user - The ID of the user placing the order.
 * @bodyparam {object} shipping - The shipping details for the order.
 * @bodyparam {object} payment - The payment details for the order.
 * @bodyparam {number} itemsPrice - The total price of all items in the order.
 * @bodyparam {number} taxPrice - The tax amount for the order.
 * @bodyparam {number} shippingPrice - The shipping cost for the order.
 * @bodyparam {number} totalPrice - The total price of the order including tax and shipping.
 * @returns {object} The newly created order and a success message.
 * @throws {Error} If an error occurs while creating the order.
 */
router.post("/", isAuth, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const newOrderCreated = await newOrder.save();
    res
      .status(201)
      .send({ message: "New Order Created", data: newOrderCreated });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

/**
 * Update the payment status of an order.
 * @route PATCH /api/orders/:id/pay
 * @authentication This route requires authentication.
 * @param {string} id.path.required - The ID of the order to update.
 * @bodyparam {string} payerID.body.required - The ID of the payer for the payment.
 * @bodyparam {string} orderID.body.required - The ID of the order.
 * @bodyparam {string} paymentID.body.required - The ID of the payment.
 * @returns {object} A success message and the updated order.
 * @throws {404} If the order is not found.
 */
router.patch("/:id/pay", isAuth, async (req, res) => {
  const { payerID, orderID, paymentID } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment = {
        paymentMethod: "paypal",
        paymentResult: { payerID, orderID, paymentID },
      };

      const updatedOrder = await order.save();

      res.send({
        message: "Your Payment Was Successfully Processed",
        order: updatedOrder,
      });
    } else {
      res.status(404).send({ warning: "Order Not Found." });
    }
  } catch (error) {
    res.status(500).send({ error: "Error Updating Payment.", error: error });
  }
});

export default router;
