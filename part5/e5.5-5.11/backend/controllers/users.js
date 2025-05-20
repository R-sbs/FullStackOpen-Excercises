import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blog');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('blogs');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const rawPassword = req.body.password;
  const username = req.body.username;
  if (rawPassword.length < 6) {
    return res.status(400).json({ error: "Password Must be more than 6 characters"});
  }
  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username Must be must be 3 or more characters"});
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);
    let user = await User.create({ ...req.body, passwordHash });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (result) {
      res.status(204).send("Deleted Successfully");
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
