import express from "express";
import { RegisterController } from "../controllers/registerControllers.js";
import {authenticateToken} from '../middleware/authenticateToken.js'
const registerRouter = express.Router();
const registerController = new RegisterController()

//registerRouter.post("/", registerController.addRegister);
registerRouter.post("/:id",authenticateToken, registerController.getRegister);
//api to post get : http://localhost:8080/register/username="nkh";
// registerRouter.delete("/:id", registerController.deleteRegister);
 registerRouter.put("/:id",authenticateToken,registerController.updateRegister);

export {
    registerRouter
}