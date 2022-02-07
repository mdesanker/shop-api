require("dotenv").config();
import express, { Request, Response } from "express";
const cors = require("cors");
const helmet = require("helmet");
import connectDB from "./config/mongoConfig";

// Routes
import product from "./routes/api/product";

// Initialize app
const app = express();

// Connect db
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/products", product);

app.get("/", async (req: Request, res: Response) => {
  return res.send("The Shop API");
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
