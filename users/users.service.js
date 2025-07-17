import UserRepository from "./users.repository.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    console.info("UserService initialized with repository");
  }

  async getUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getUser(id) {
    return await this.userRepository.getUserById(id);
  }

  async addUser(userData) {
    return await this.userRepository.createUser(userData);
  }

  async modifyUser(id, updateData) {
    return await this.userRepository.updateUser(id, updateData);
  }

  async removeUser(id) {
    return await this.userRepository.deleteUser(id);
  }
}

export default new UserService(UserRepository);
