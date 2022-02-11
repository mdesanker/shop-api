import express from "express";
const localAuth = express.Router();

import localAuthController from "../../controllers/localAuth";

localAuth.post("/register", localAuthController.register);
localAuth.post("/login", localAuthController.login);

export = localAuth;
