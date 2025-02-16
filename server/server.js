import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { handleError } from "./handlers/errorHandler.js";
import dbConnection from "./config/database.js";
import config from "./config/config.js";
dotenv.config();
const app = express();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(handleError);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
