import User from "../models/users.model.js";
const validRoles = ["owner", "tenant"];

class UserRepository {
  async getAllUsers() {
    return await User.find().select("-password");
  }

  async getUserById(id) {
    return await User.findById(id).select("-password");
  }

  async createUser({ avatar, role, name, firstname, phone, email, password }) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email déjà utilisé");

    const newUser = new User({
      avatar,
      role,
      name,
      firstname,
      phone,
      email,
      password,
    });

    return newUser.save();
  }

  async updateUser(id, update) {
    const { email, role } = update;

    if (email) {
      const existingUser = await User.findOne({ email });
      const isSameUser = existingUser && existingUser._id.toString() === id;
      if (existingUser && !isSameUser) throw new Error("Email déjà utilisé");
    }

    if (role && !validRoles.includes(role)) throw new Error("Rôle invalide");

    return User.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}
export default new UserRepository();
