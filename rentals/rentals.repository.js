import mongoose from "mongoose";
import Rental from "./rentals.model.js";

class RentalRepository {
  async createRental(data) {
    try {
      return await Rental.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création du bien : ${error.message}`);
    }
  }

  async getAllRentals() {
    try {
      return await Rental.find();
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des biens : ${error.message}`
      );
    }
  }

  async getRentalById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID de bien invalide");
      }
      const rental = await Rental.findById(id);
      if (!rental) throw new Error("Bien non trouvé");
      return rental;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération du bien : ${error.message}`
      );
    }
  }

  async updateRental(id, data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID de bien invalide");
      }
      const updated = await Rental.findByIdAndUpdate(id, data, { new: true });
      if (!updated) throw new Error("Bien non trouvé pour mise à jour");
      return updated;
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour du bien : ${error.message}`
      );
    }
  }

  async deleteRental(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID de bien invalide");
      }
      const deleted = await Rental.findByIdAndDelete(id);
      if (!deleted) throw new Error("Bien non trouvé pour suppression");
      return deleted;
    } catch (error) {
      throw new Error(
        `Erreur lors de la suppression du bien : ${error.message}`
      );
    }
  }
}

export default new RentalRepository();
