import User from "../models/users.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

async function verifyPassword(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Mot de passe reçu :", req.body.password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Utilisateur non trouvé");
    }
    console.log(user);
    const valid = await argon2.verify(user.password, password);
    console.log("Haché en BDD :", user.password, password, valid);
    if (!valid) {
      return res.status(401).send("Authentification incorrecte");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.send("Connexion réussie !");
    console.log(token);
  } catch (err) {
    res.status(500).send("Erreur de connexion.");
  }
}
export default verifyPassword;
