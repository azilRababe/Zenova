import mongoose from "mongoose";
import config from "./config";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected ..."))
  .catch((error) => console.log(error.message));
