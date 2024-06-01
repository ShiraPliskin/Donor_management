
import express from "express";
import { RegisterController } from "../controllers/registerControllers.js";
const registerRouter = express.Router();

const registerController = new RegisterController()

registerRouter.post("/", registerController.addRegister);
registerRouter.post("/:username", registerController.getRegister);
registerRouter.delete("/:username", registerController.deleteRegister);
registerRouter.put("/",registerController.updateRegister);
export {
    registerRouter
}