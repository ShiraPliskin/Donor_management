import { UsersService } from '../service/usersService.js'
import jwt from 'jsonwebtoken';
// const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 259200000 });
//             res.status(200).json({ message: 'Login successful', token: token });
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
            await userService.deleteUser("id", req.params.id);
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
            const user = req.body;
            const userService = new UsersService();
            const resultItem = await userService.addUser(user);
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
