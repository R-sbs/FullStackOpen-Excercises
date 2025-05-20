import mongoose from "mongoose";
import logger from "./logger.js";
import config from "./config.js";

const connectDB = async () => {
  logger.info("Connecting to MongoDB...");
  logger.info(config.MONGO_URI)
  await mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      logger.info("Connected to MongoDB SuccessFully");
    })
    .catch((error) => {
      logger.err(error.errorResponse.errmsg);
      process.exit(1);
    });
};

export default connectDB;
