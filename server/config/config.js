import dotenv from "dotenv";
dotenv.config();
const config = {
  PORT: 5000 || process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: "your_jwt_secret_key",
};
export default config;
