import express from "express";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import config from "./utils/config.js";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
// import uploadRoute from "./routes/uploadRoute";

import "./utils/mongodb.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
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
