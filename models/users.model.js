import mongoose from "mongoose";
import Rental from "./rentals.model.js";

const userSchema = new mongoose.Schema({
  avatar: { type: String },
  role: { type: String, enum: ["owner", "tenant"], required: true },
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
      await Rental.deleteMany({ userId: doc._id });
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
