import { faker } from "@faker-js/faker";
import productModel from "../models/productModel.js";

// Generate a random review object
function generateReview() {
  return {
    name: faker.person.fullName(),
    rating: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.paragraph(),
  };
}

// Generate a random product object
function generateProduct() {
  const reviews = [];
  const numReviews = faker.number.int({ min: 0, max: 10 });
  for (let i = 0; i < numReviews; i++) {
    reviews.push(generateReview());
  }

  return {
    name: faker.commerce.productName(),
    image: faker.image.urlLoremFlickr({ category: "food" }),
    brand: faker.company.name(),
    price: faker.number.int({ min: 10, max: 100 }),
    category: faker.helpers.arrayElement([
      "Electronics",
      "Clothing",
      "Home",
      "Beauty",
    ]),
    countInStock: faker.number.int({ min: 0, max: 100 }),
    description: faker.lorem.paragraph(),
    rating: faker.number.int({ min: 0, max: 5 }),
    numReviews: numReviews,
    reviews: reviews,
  };
}

// Generate an array of seed data
function generateSeedData(count) {
  const seedData = [];
  for (let i = 0; i < count; i++) {
    seedData.push(generateProduct());
  }
  return seedData;
}

// Generate 10 sample products
const seedData = generateSeedData(10);

// Insert the seed data into the database
productModel
  .insertMany(seedData)
  .then(() => {
    console.log("Seed data inserted successfully");
  })
  .catch((err) => {
    console.log("Error inserting seed data:", err.message);
  });
