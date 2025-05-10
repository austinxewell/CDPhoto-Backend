import express from "express";
import cors from "cors"; // Import CORS
import apiRoutes from "./routes/index.js";

const PORT = process.env.PORT || 8080;
const app = express();

// Use CORS middleware
const corsOptions = {
  origin: "http://localhost:3000", // Allow your frontend app
  methods: ["GET", "POST", "DELETE"], // Specify the methods allowed
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions)); // Use CORS with options

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Use apiRoutes
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
