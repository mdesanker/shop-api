import express, { urlencoded } from "express";

// Initialize test app
const app = express();

// Routes
import auth from "../api/auth";
import cart from "../api/cart";
import category from "../api/category";
import product from "../api/product";
import user from "../api/user";

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/cart", cart);
app.use("/category", category);
app.use("/product", product);
app.use("/user", user);

export = app;
