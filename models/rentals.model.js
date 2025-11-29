import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  rentalName: { type: String, required: true, maxlength: 50 },
  beds: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 250 },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  petsForbidden: { type: Boolean, default: false },
  nonSmoking: { type: Boolean, default: false },

  address: {
    codePostal: { type: String, required: true, maxlength: 5 },
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

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
