import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const registerRouter = express.Router();

registerRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  // Basic validation
  if (!username || !password || password.length < 3) {
    return response.status(400).json({
      error:
        "Username and password are required. Password must be at least 3 characters.",
    });
  }

  // Check if username is taken
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "Username must be unique",
    });
  }

  // Hash the password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create new user
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default registerRouter;
