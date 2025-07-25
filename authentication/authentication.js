import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import argon2 from "argon2";

async function verifyPassword(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Utilisateur non trouvé");
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return res.status(401).send("Authentification incorrecte");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "Connexion réussie !",
      role: user.role, // 'owner', 'tenant', les 2
      firstname: user.firstname,
    });
  } catch (err) {
    res.status(500).send("Erreur de connexion.");
  }
}

async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Accès interdit, token manquant.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("firstname");

    if (!user) {
      return res.status(401).send("Utilisateur non trouvé ou supprimé.");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send("Token invalide ou expiré.");
  }
}

async function clearCookie(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).send("Utilisateur déconnecté");
}

export { verifyPassword, verifyToken, clearCookie };
