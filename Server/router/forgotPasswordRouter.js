import express from "express";
import { ForgotPasswordController } from "../controllers/forgotPasswordController.js";

const forgotPasswordRouter = express.Router();
const forgotPasswordController = new ForgotPasswordController();
forgotPasswordRouter.post("/:id", forgotPasswordController.forgotPassword)
forgotPasswordRouter.put("/:id", forgotPasswordController.updateByOTP)

export{
    forgotPasswordRouter
}