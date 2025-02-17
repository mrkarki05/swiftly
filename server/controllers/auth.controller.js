import { clientError } from "../handlers/errorHandler.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, vehicle, location } = req.body;
    if (role === "driver" && (!vehicle || !location)) {
      return next(
        clientError(400, "Drivers must provide vehicle and location")
      );
    }
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      var hashedPassword = await bcrypt.hash(password, salt);
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      vehicle: role === "driver" ? vehicle : undefined,
      location:
        role === "driver"
          ? { type: "Point", coordinates: location }
          : undefined,
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET
    );
    user.password = undefined;
    res.status(201).json({
      status: true,
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log("hello");
    next(error);
  }
};

export default { signup };
