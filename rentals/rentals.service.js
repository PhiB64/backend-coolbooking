import Rental from "../rentals/rentals.model.js";

export const createRental = async (data) => {
  return await Rental.create(data);
};

export const getAllRentals = async () => {
  return await Rental.find();
};

export const getRentalById = async (id) => {
  return await Rental.findById(id);
};

export const updateRental = async (id, data) => {
  return await Rental.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRental = async (id) => {
  return await Rental.findByIdAndDelete(id);
};
