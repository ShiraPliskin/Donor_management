import express from "express";
import { UsersController } from '../controllers/usersController.js';
import {authenticateToken} from '../middleware/authenticateToken.js'

const usersRouter = express.Router();

const userController = new UsersController();

usersRouter.get('/',authenticateToken, userController.getUsers)
usersRouter.get("/login", userController.getUsersForLogin)
usersRouter.get("/:id",authenticateToken, userController.getUserById)
usersRouter.post("/",authenticateToken, userController.addUser)
usersRouter.delete("/:id",authenticateToken, userController.deleteUser)
usersRouter.put("/:id",authenticateToken, userController.updateUser)

export{
    usersRouter
}