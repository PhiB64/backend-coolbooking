import userRepository from "./users.repository.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    console.info("UserService initialized with repository");
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(userData) {
    return await this.userRepository.createUser(userData);
  }

  async updateUser(id, updateData) {
    return await this.userRepository.updateUser(id, updateData);
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }
}

export default new UserService(userRepository);
