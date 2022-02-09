import express from "express";
const auth = express.Router();
import authController from "../../controllers/auth";

auth.get("/failed", authController.signinFailed);
auth.get("/success", authController.signinSuccessful);
auth.get("/google", authController.googleAuthenticate);
auth.get("/google/redirect", authController.googleRedirect);
auth.get("/logout", authController.logout);

export = auth;
