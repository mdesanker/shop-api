import express, { Request, Response, NextFunction } from "express";
const auth = express.Router();
import authController from "../../controllers/auth";

auth.get("/", authController.getAllUsers);

export = auth;
