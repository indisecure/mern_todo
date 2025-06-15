const env = require("dotenv");
env.config(); // Load environment variables

const express = require("express");

const app = express(); // Initialize express

const userRouter = require("./routes/route");

app.use(express.json())// to enable app to send JSON data/to be used after app creation

// const cors = require("cors");
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"],
//   credentials: true
// }));
const { connectDB } = require('./database/dbConnection')

app.use("/api", userRouter); // Use router

const PORT = process.env.PORT || 5000; // Fallback port in case env variable is missing

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
});


