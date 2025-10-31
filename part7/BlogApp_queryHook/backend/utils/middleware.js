import logger from "./logger.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "./config.js";

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    response.status(400).send(error.message);
  } else if (error.name === "CastError") {
    response.status(400).send("Malformatted ID");
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    response.status(400).json({
      error: "choose different username, as it is expected to be unique",
    });
  } else if (error.name === "JsonWebTokenError") {
    response.status(400).json({ error: "Token Invalid" });
  } else {
    response.status(400).send("Oops, Something Not Right");
  }
  next(error);
};

const requestLogger = (request, response, next) => {
  logger.info("---Request Details---");
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body || null);
  logger.info("--- End ----");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    request.token = auth.replace("Bearer ", "");
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodeToken = jwt.verify(request.token, config.SECRET);

  if (!decodeToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodeToken.id);
  if (user) {
    request.user = user;
  } else {
    request.user = null;
  }

  next();
};

export {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
