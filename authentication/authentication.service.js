import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import argon2 from "argon2";

class AuthenticationService {
  async authenticateUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return user;
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  async getUserById(userId) {
    const user = await User.findById(userId).select("firstname");

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return user;
  }

  getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";

    return {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      maxAge: 3600000,
    };
  }
}

export default new AuthenticationService();
