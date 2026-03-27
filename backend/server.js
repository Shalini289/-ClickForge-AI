import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import generateRoutes from "./src/routes/generateRoutes.js";
dotenv.config();

const app = express();

// ✅ MIDDLEWARE
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ TEST ROUTE (for debugging)
app.get("/test", (req, res) => {
  res.send("Backend is working 🚀");
});

// ✅ MAIN API ROUTE
app.use("/api", generateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




