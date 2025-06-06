import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);


  if (!user) {
    return response.status(401).json({ error: "Invalid username or password" });
  } else  if (!passwordCorrect) {
    return response.status(401).json({ error: "Invalid username or password" });
  }

  const userForToken = { username: user.username, id: user._id };

  const token = jwt.sign(userForToken, config.SECRET);

  response
    .status(200)
    .send({ token, id: user.id, username: user.username, name: user.name });
});

export default loginRouter;
