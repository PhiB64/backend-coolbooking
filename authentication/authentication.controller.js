import authenticationService from "./authentication.service.js";

class AuthenticationController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await authenticationService.authenticateUser(
        email,
        password
      );
      const token = authenticationService.generateToken(user._id);
      const cookieOptions = authenticationService.getCookieOptions();

      res.cookie("token", token, cookieOptions);

      res.status(200).json({
        message: "Connexion réussie !",
        role: user.role,
        firstname: user.firstname,
        avatar: user.avatar,
      });
    } catch (err) {
      if (err.message === "USER_NOT_FOUND") {
        return res.status(401).send("Utilisateur non trouvé");
      }
      if (err.message === "INVALID_CREDENTIALS") {
        return res.status(401).send("Authentification incorrecte");
      }
      res.status(500).send("Erreur de connexion.");
    }
  }

  async logout(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
    });
    res.status(200).send("Utilisateur déconnecté");
  }
}

export default new AuthenticationController();
