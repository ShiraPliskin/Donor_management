import express from "express";
import { UsersController } from '../controllers/usersController.js'
const usersRouter = express.Router();

const userController = new UsersController();

usersRouter.get('/', userController.getUsers)
usersRouter.get("/:id", userController.getUserById)
usersRouter.post("/", userController.addUser)
usersRouter.delete("/:id", userController.deleteUser)
usersRouter.put("/:id", userController.updateUser)

export{
    usersRouter
}