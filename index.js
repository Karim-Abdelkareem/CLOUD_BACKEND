import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./src/database/connection.js";
import userRoutes from "./src/modules/users/user.route.js";
import { errorHandler } from "async-handler-express";
//EXPRESS APP
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

//ROUTES
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SERVER_IS_RUNNING",
  });
});

app.use("/api/v1/users", userRoutes);
app.use(/.*/, (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "ROUTE_NOT_FOUND",
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
app.use(errorHandler);

//DB&SERVER CONNECTION
dbConnection();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
