import userRepository from "./users.repository.js";
import argon2 from "argon2";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    console.info("UserService initialized with repository");
  }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async getUserById(id) {
    return await userRepository.getUserById(id);
  }

  async createUser(userData) {
    const hashedPassword = await argon2.hash(userData.password, {
      type: argon2.argon2id,
    });
    console.log("password", userData.password);

    const safeUser = {
      ...userData,
      password: hashedPassword,
    };
    console.log("Haché créé :", hashedPassword);

    return await userRepository.createUser(safeUser);
  }

  async updateUser(id, updateData) {
    return await userRepository.updateUser(id, updateData);
  }

  async deleteUser(id) {
    return await userRepository.deleteUser(id);
  }
}

export default new UserService(userRepository);
