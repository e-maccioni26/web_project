import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import sequelize from "./config/database";
import router from "./routes/routes";
import cors from "cors";
import User from "./models/User";
import Tache from "./models/Tache";
import Tag from "./models/Tag";
import UsersTaches from "./models/UsersTaches";
import TachesTags from "./models/TachesTags";
import Project from "./models/Project";
import UsersProjects from "./models/UsersProjects";


const app = express();
app.use(cors({
  origin: "http://localhost/*", // Autoriser seulement cette origine
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // Headers autorisés
}));
app.use(express.json());

app.use(router);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
  sequelize.sync();
  app.listen(PORT, () => {
    Project.findAll();
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
