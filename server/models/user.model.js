import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be atleast 6 characters"],
  },
  role: {
    type: String,
    enum: ["passenger", "driver", "admin"],
    default: "passenger",
  },
  phone: {
    type: String,
    match: /^98[4-9]\d{7}$/,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
});
userSchema.index({ location: "2dsphere" });
export default mongoose.model("User", userSchema);
