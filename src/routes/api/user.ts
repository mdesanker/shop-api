import express, { Request, Response, NextFunction } from "express";
const user = express.Router();
import userController from "../../controllers/user";

user.get("/", userController.getAllUsers);

export = user;
