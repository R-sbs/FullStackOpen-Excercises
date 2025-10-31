import express from "express";
import cors from "cors";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import connectDB from "./utils/connectDB.js";
import {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
} from "./utils/middleware.js";
import blogsRouter from "./controllers/blog.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import registerRouter from "./controllers/register.js";
import { corsOptions } from "./utils/cors.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (req, res) => {
  res.status(200).send("API is Alive and Kicking");
});

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use(tokenExtractor);
app.use("/api/users", usersRouter);
app.use("/api/blogs", userExtractor, blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(config.PORT, async () => {
  await connectDB();
  logger.info(`Server is Running on ${config.PORT}`);
});

export default app;
