import express from "express";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import config from "./backend/utils/config.js";

import userRoute from "./backend/routes/userRoute.js";
import productRoute from "./backend/routes/productRoute.js";
import orderRoute from "./backend/routes/orderRoute.js";
// import uploadRoute from "./routes/uploadRoute";

import "./backend/utils/mongodb.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("trust proxy", false);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(helmet());
app.use(cors());

// app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

// app.use(express.static(path.join(__dirname, "/../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
// });

// Seeds
// import "./seeds/productSeeds.js";
// import './seeds/userSeeds.js';
// import "./seeds/orderSeeds.js";

app.listen(config.PORT, () => {
  console.log(`App running on port ${config.PORT}`);
});
