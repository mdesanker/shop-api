import express, { Request, Response, NextFunction } from "express";
const cart = express.Router();
import cartController from "../../controllers/cart";

cart.get("/", cartController.getAllCarts);

export = cart;
