import { faker } from "@faker-js/faker";
import User from "../models/userModel.js";

// Generate a random user object
function generateUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
    phoneNumber: faker.phone.number("+212 ###-###-###"),
    isAdmin: faker.datatype.boolean(),
  };
}

// Generate an array of seed data
function generateSeedData(count) {
  const seedData = [];
  for (let i = 0; i < count; i++) {
    seedData.push(generateUser());
  }
  return seedData;
}

// Generate 10 sample users
const seedData = generateSeedData(5);

// Insert the seed data into the database
User.insertMany(seedData)
  .then(() => {
    console.log("Seed data inserted successfully");
  })
  .catch((err) => {
    console.log("Error inserting seed data:", err.message);
  });
