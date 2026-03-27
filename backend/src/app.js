import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generateRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
app.use("/generate", generateRoutes);

export default app;