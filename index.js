import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/MongoDB.js";
import users_router from "./routes/users.router.js";
import rentals_router from "./routes/rentals.router.js";
import authentication_router from "./routes/authentication.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Multi-origines autorisées via FRONT (séparées par virgules dans .env)
const allowedOrigins = process.env.FRONT.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
    credentials: true, // autorise cookies / headers d’auth
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authentication_router);
app.use("/users", users_router);
app.use("/rentals", rentals_router);

// Route API externe (Geo API Gouv) pour la localisation
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

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur attrapée :", err.message);
  const status = err.status || 400;
  res.status(status).json({ message: err.message });
});

// Connexion MongoDB
connectDB();

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
