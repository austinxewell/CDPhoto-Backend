import express from "express";
import apiRoutes from "./routes/index.js";

const PORT = process.env.PORT || 8080;
const app = express();

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
