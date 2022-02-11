import express from "express";
const localAuth = express.Router();

import localAuthController from "../../controllers/localAuth";

localAuth.get("/register", localAuthController.register);

export = localAuth;
