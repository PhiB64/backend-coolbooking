async function clearCookie(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).send("Utilisateur déconnecté");
}

export default clearCookie;
