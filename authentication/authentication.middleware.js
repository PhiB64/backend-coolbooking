import authenticationService from "./authentication.service.js";

async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Accès interdit, token manquant.");
  }

  try {
    const decoded = authenticationService.verifyToken(token);
    const user = await authenticationService.getUserById(decoded.id);

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send("Token invalide ou expiré.");
  }
}

export { verifyToken };
