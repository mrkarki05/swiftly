import mongoose from "mongoose";
import config from "./config.js";
const dbConnection = () => {
  mongoose
    .connect(config.MONGO_URL)
    .then(() => {
      console.log("Database connected succesfully!!!");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default dbConnection;
