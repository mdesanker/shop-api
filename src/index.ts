require("dotenv").config();
import express, { Request, Response } from "express";
const cors = require("cors");
const helmet = require("helmet");
import connectDB from "./config/mongoConfig";

// Routes
import auth from "./routes/api/auth";
import cart from "./routes/api/cart";
import category from "./routes/api/category";
import product from "./routes/api/product";
import user from "./routes/api/user";

// Initialize app
const app = express();

// Connect db
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/cart", cart);
app.use("/category", category);
app.use("/product", product);
app.use("/user", user);

app.get("/", async (req: Request, res: Response) => {
  return res.send("The Shop API");
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
