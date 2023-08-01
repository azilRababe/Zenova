import { faker } from "@faker-js/faker";
import productModel from "../models/productModel.js";

import "../utils/mongodb.js";

// Generate a random rating between 0 and 5
function generateRating() {
  return faker.number.int({ min: 0, max: 5 });
}

// Generate a random review object
function generateReview() {
  return {
    name: faker.person.fullName(),
    rating: generateRating(),
    comment: faker.lorem.paragraph(),
  };
}

// Generate a random product object
function generateProduct() {
  const numReviews = faker.number.int({ min: 0, max: 10 });
  const reviews = Array.from({ length: numReviews }, generateReview);

  return {
    name: faker.lorem.words(2),
    image: faker.image.urlLoremFlickr({ category: "food" }),
    brand: faker.company.name(),
    price: faker.number.int({ min: 10, max: 100 }),
    category: faker.helpers.arrayElement([
      "Food",
      "Cosmetic Products",
      "Vegan Products",
      "Organic Products",
      "Other",
    ]),
    countInStock: faker.number.int({ min: 0, max: 100 }),
    description: faker.lorem.paragraph(),
    rating: generateRating(),
    numReviews: numReviews,
    reviews: reviews,
  };
}

async function seedDatabase() {
  try {
    const numberOfProductsToSeed = 20;
    const seedData = Array.from(
      { length: numberOfProductsToSeed },
      generateProduct
    );

    await productModel.deleteMany();
    await productModel.insertMany(seedData);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  }
}

seedDatabase();
