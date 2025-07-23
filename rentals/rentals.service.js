import rentalRepository from "./rentals.repository.js";

class RentalService {
  constructor(rentalRepository) {
    this.rentalRepository = rentalRepository;
    console.info("RentalService initialized with repository");
  }

  async createRental(data) {
    return await rentalRepository.createRental(data);
  }

  async getAllRentals() {
    return await rentalRepository.getAllRentals();
  }

  async getRentalById(id) {
    return await rentalRepository.getRentalById(id);
  }

  async updateRental(id, data) {
    return await rentalRepository.updateRental(id, data);
  }

  async deleteRental(id) {
    return await rentalRepository.deleteRental(id);
  }
}

export default new RentalService(rentalRepository);
