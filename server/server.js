import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { handleError } from "./handlers/errorHandler.js";
import dbConnection from "./config/database.js";
import config from "./config/config.js";
import authRoute from "./routes/auth.route.js";
dotenv.config();
const app = express();
dbConnection();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoute);
app.use(handleError);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
