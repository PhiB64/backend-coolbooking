import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/MongoDB.js";
import users_router from "./routes/users.router.js";
import rentals_router from "./routes/rentals.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONT, // frontend
    credentials: true, // autorise les cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", users_router);

app.use("/rentals", rentals_router);

app.get("/api/location", async (req, res) => {
  const { codePostal } = req.query;

  if (!codePostal || !/^\d{5}$/.test(codePostal)) {
    return res.status(400).json({ message: "Code postal invalide" });
  }

  try {
    const communesRes = await fetch(
      `${process.env.GOUV}/communes?codePostal=${codePostal}&fields=nom,codeDepartement,region&format=json`
    );
    const communes = await communesRes.json();

    if (communes.length === 0) {
      return res.status(404).json({ message: "Aucune commune trouvée" });
    }

    const codeDepartement = communes[0].codeDepartement;

    const deptRes = await fetch(
      `${process.env.GOUV}/departements/${codeDepartement}`
    );
    const departement = await deptRes.json();

    res.json({
      communes,
      departement: departement.nom,
      region: communes[0].region.nom,
    });
  } catch (error) {
    console.error("Erreur localisation combinée :", error.message);
    res.status(500).json({ message: "Erreur serveur localisation" });
  }
});

app.use((err, req, res, next) => {
  console.error("Erreur attrapée :", err.message);
  res.status(400).json({ message: err.message });
});

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
