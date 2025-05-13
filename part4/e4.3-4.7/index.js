import express from "express";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import connectDB from "./utils/connectDB.js";
import { requestLogger, errorHandler, unknownEndpoint } from "./utils/middleware.js";
import blogsRouter from "./controllers/blog.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (req, res) => {
  res.status(200).send("API is Alive and Kicking");
});

app.use("/api/blogs", blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(config.PORT, async () => {
  await connectDB();
  logger.info(`Server is Running on ${config.PORT}`);
});
