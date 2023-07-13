import { faker } from "@faker-js/faker";
import orderModel from "../models/orderModel.js";

// Generate a random order item object
function generateOrderItem() {
  return {
    name: faker.commerce.productName(),
    qty: faker.internet.number({ min: 1, max: 10 }),
    image: faker.image.food(),
    price: faker.internet.number({ min: 10, max: 100 }),
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
  const orderItems = [];
  const numItems = faker.number.int({ min: 1, max: 5 });
  for (let i = 0; i < numItems; i++) {
    orderItems.push(generateOrderItem());
  }

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

// Generate an array of seed data
function generateSeedData(count) {
  const seedData = [];
  for (let i = 0; i < count; i++) {
    seedData.push(generateOrder());
  }
  return seedData;
}

// Generate 10 sample orders
const seedData = generateSeedData(10);

// Insert the seed data into the database
orderModel
  .insertMany(seedData)
  .then(() => {
    console.log("Seed data inserted successfully");
  })
  .catch((err) => {
    console.error("Error inserting seed data:", err);
  });
