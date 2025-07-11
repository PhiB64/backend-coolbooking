import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: { type: String, required: true },
  role: { type: String, required: true, enum: ["owner", "tenant"] },
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/* userSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
      await collection.deleteMany({ userId: doc._id }); 
    }
    next();
  } catch (err) {
    next(err);
  }
}); */

const User = mongoose.model("User", userSchema);

export default User;
