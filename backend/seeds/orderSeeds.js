import { faker } from "@faker-js/faker";
import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";

// Generate a random order item object
function generateOrderItem() {
  return {
    name: faker.commerce.productName(),
    qty: faker.number.int({ min: 1, max: 10 }),
    image: faker.image.urlLoremFlickr({ category: "food" }),
    price: faker.number.int({ min: 10, max: 100 }),
    product: mongoose.Types.ObjectId(),
  };
}

// Generate a random shipping object
function generateShipping() {
  return {
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
}

// Generate a random payment object
function generatePayment() {
  return {
    paymentMethod: faker.helpers.arrayElement([
      "Credit Card",
      "PayPal",
      "Cash",
    ]),
  };
}

// Generate a random order object
function generateOrder() {
  const orderItems = Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    generateOrderItem
  );

  return {
    user: mongoose.Types.ObjectId(),
    orderItems,
    shipping: generateShipping(),
    payment: generatePayment(),
    itemsPrice: faker.number.int({ min: 50, max: 500 }),
    taxPrice: faker.number.int({ min: 5, max: 50 }),
    shippingPrice: faker.number.int({ min: 10, max: 100 }),
    totalPrice: faker.number.int({ min: 100, max: 1000 }),
    isPaid: faker.datatype.boolean(),
    paidAt: faker.date.past(),
    isDelivered: faker.datatype.boolean(),
    deliveredAt: faker.date.past(),
  };
}

async function seedDatabase() {
  try {
    const numberOfOrdersToSeed = 10;
    const seedData = Array.from(
      { length: numberOfOrdersToSeed },
      generateOrder
    );

    await orderModel.insertMany(seedData);
    console.log("Seed data inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

seedDatabase();
