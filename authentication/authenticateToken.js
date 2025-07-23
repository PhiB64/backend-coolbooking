import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

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

export default verifyToken;
