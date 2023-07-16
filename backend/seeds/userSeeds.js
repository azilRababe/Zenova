import { faker } from "@faker-js/faker";
import User from "../models/userModel.js";
import "../utils/mongodb.js";

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

async function seedDatabase() {
  try {
    const numberOfUsersToSeed = 10;
    const seedData = generateSeedData(numberOfUsersToSeed);

    await User.insertMany(seedData);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  }
}

seedDatabase();
