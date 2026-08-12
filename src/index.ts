import express from "express";
import http from "http";
import cors from "cors";
import { appDataSource } from "./db/config/data-source";
import "dotenv/config";
import { userRouter } from "./http/routes/user-routes";
import { authRouter } from "./http/routes/auth-routes";
import { cardRouter } from "./http/routes/card-routes";
import { paymentMethodsRouter } from "./http/routes/payment-methods-routes";

const app = express();
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/users", userRouter);
app.use("/users", authRouter);
app.use("/cards", cardRouter);
app.use("/payment-method", paymentMethodsRouter);

appDataSource
  .initialize()
  .then(() => {
    console.log("Database connected successfully!");

    app.get("/", (req, res) => {
      res.send("DB Connected!");
    });

    const server = http.createServer(app);
    server.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the DB:", error);
  });
