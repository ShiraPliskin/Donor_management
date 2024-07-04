import { UsersService } from '../service/usersService.js'
import jwt from 'jsonwebtoken';

export class UsersController {

    async getUsers(req, res, next) {
        try {
            const userService = new UsersService();
            const resultItems = await userService.getUsers(req.query);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUsersForLogin(req, res, next) {
        try {
            const userService = new UsersService();
            const resultItems = await userService.getUsers(req.query,true);
            return res.cookie("token", resultItems.token, { httpOnly: true, secure: true })
                .json(resultItems );
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUserById(req, res, next) {
        try {
            const userService = new UsersService();
            const resultItems = await userService.getUserById(req.params.id);
            return res.json({  data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res, next) {
        try {
            const userService = new UsersService();
            const resultItems = await userService.updateUser(req.body, req.params.id);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userService = new UsersService();
            await userService.deleteUser("id", req.params.id);
            return res.json({ data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addUser(req, res, next) {
        try {
            const user = req.body;
            const userService = new UsersService();
            const resultItem = await userService.addUser(user);
            res.json({ insertId: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
