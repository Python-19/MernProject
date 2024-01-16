import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./connectdb.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import upload from "./middleware/upload-middleware.js";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Apply cors middleware before defining routes
app.use(cors());

// For Parsing application/json
app.use(express.json());

// Application Level Middleware For Parsing multipart/form-data
//app.use(upload.fields([{ name: 'pimage', maxCount: 1 }, { name: 'rdoc', maxCount: 1 }]))

// Load Routes 
app.use("/api", candidateRoutes);

connectDB(DATABASE_URL);
//Static Files
app.use(express.static(`public/uploads/pimage`));
//app.use("/api/uploads/pimage", express.static("public/uploads/pimage"));

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
