import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generateRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/generate", generateRoutes);

export default app;