import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { getToken, isAuth } from "../utils/util.js";
import { config } from "dotenv";

const router = express.Router();

/**
 * Create a new user.
 * @route POST /api/users/signUp
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} A success message if the user is created successfully.
 * @throws {Error} If the email already exists or an error occurs while saving the user.
 */
router.post("/signUp", async (req, res) => {
  try {
    const isUserExists = await User.findOne({ email: req.body.email });

    if (isUserExists) {
      return res
        .status(409)
        .json({ warning: "The entered Email already exists!" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Invalid User Data." });
  }
});

/**
 * Authenticate a user.
 * @route POST /api/users/signIn
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} An access token and user information if authentication is successful.
 * @throws {Error} If the email or password is incorrect, or an error occurs during authentication.
 */
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const signinUser = await User.findOne({ email });

    if (!signinUser) {
      return res
        .status(401)
        .json({ warning: "Username or Password Incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, signinUser.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ warning: "Username or Password Incorrect" });
    }

    res.status(202).json({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Update a user by their ID.
 * @route PATCH /api/users/:id
 * @param {string} userId - The ID of the user to update.
 * @returns {object} A success message and the updated user object.
 * @throws {Error} If the user is not found, an error occurs while updating them, or validation fails.
 */
router.patch("/:userId", isAuth, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      req.body,
      {
        new: true,
      }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: `Failed to update user: ${error.message}` });
  }
});

/**
 * Create an admin user.
 * @route POST /api/users/createadmin
 * @returns {object} The created admin user's email and name.
 * @throws {Error} If an error occurs while creating the admin user.
 */
router.post("/createadmin", async (req, res) => {
  const hashedPassword = await bcrypt.hash(config.ADMIN_PASSWORD, 10);
  try {
    const user = new User({
      name: config.ADMIN_NAME,
      email: config.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
    });

    const savedAdmin = await user.save();
    res.status(201).json({
      message: "Admin Created Successfully",
      email: savedAdmin.email,
      name: savedAdmin.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
