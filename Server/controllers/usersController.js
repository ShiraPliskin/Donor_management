import { UsersService } from '../service/usersService.js'

export class UsersController {

    async getUsers(req, res, next) {
        try {
            const userService = new UsersService();
            const resultItems = await userService.getUsers(req.query);
            return res.status(200).json(resultItems);
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
            return res.status(200).json({ status: 200, data: resultItems });
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
            return res.status(200).json(resultItems);
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
            await userService.deleteUser("user_id",req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
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
            const userService = new UsersService();
            const resultItem = await userService.addUser(req.body);
            res.status(200).json({ insertId: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
