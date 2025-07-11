import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rentalName: { type: String, required: true, maxlength: 30 },
  beds: { type: Number, required: true },
  description: { type: String, required: true },
  petsOption: { type: String, enum: ["autorisé", "interdit"], required: true },
  smokingOption: {
    type: String,
    enum: ["fumeur", "non fumeur"],
    required: true,
  },
  address: {
    region: { type: String, required: true, maxlength: 30 },
    department: { type: String, required: true, maxlength: 30 },
    city: { type: String, required: true, maxlength: 30 },
  },
  images: {
    image_1: { type: String, required: true },
    image_2: { type: String },
    image_3: { type: String },
    image_4: { type: String },
    image_5: { type: String },
  },
});

export default mongoose.model("Rental", rentalSchema);
