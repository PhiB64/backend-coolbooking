import Rental from "./rentals.model.js";

class RentalRepository {
  async create(data) {
    return await Rental.create(data);
  }

  async findAll() {
    return await Rental.find();
  }

  async findById(id) {
    return await Rental.findById(id);
  }

  async updateById(id, data) {
    return await Rental.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await Rental.findByIdAndDelete(id);
  }
}

export default new RentalRepository();
