import RentalRepository from "./rentals.repository.js";

class RentalService {
  constructor(rentalRepository) {
    this.rentalRepository = rentalRepository;
    console.info("RentalService initialized with repository");
  }

  async createRental(data) {
    return await this.rentalRepository.create(data);
  }

  async getAllRentals() {
    return await this.rentalRepository.findAll();
  }

  async getRentalById(id) {
    return await this.rentalRepository.findById(id);
  }

  async updateRental(id, data) {
    return await this.rentalRepository.updateById(id, data);
  }

  async deleteRental(id) {
    return await this.rentalRepository.deleteById(id);
  }
}

export default new RentalService(RentalRepository);
