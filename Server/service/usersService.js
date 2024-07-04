import { executeQuery } from './db.js'
import { addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery } from '../queries/genericQueries.js'
import { RegisterService } from './registerService.js';
import 'dotenv/config'
import { token } from 'morgan';
import jwt from 'jsonwebtoken';

const registerService = new RegisterService;


const signToken = (email) => {
    return jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    })
}

export class UsersService {
    async getUsers(queryParams, isLogin = "") {
        console.log("queryParams " + queryParams.filter.substring(6));
        const { dataQuery, countQuery } = getByConditionQuery("users", queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        if (isLogin !== "yes") return { data, total };
        const email = queryParams.filter.substring(6);
        return { data, total, token: signToken(email) };        
    }

    async getUserById(id) {
        const queryUser = getByIdQuery("users");
        const result = await executeQuery(queryUser, [id]);
        return result;
    }

    async deleteUser(idKey, idValue) {
        await registerService.deleteRegister(idValue, "user_id");
        const queryUser = deleteQuery("users", `${idKey}`);
        const result = await executeQuery(queryUser, [idValue]);
        return result;
    }

    async updateUser(updatedUser, id) {
        const query = updateQuery("users", updatedUser, "id");
        const values = Object.values(updatedUser);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addUser(newUser) {
        const register = {
            user_id: "",
            password: newUser.password
        }
        delete newUser.password;
        const values = Object.values(newUser);
        const queryUser = addQuery("users", newUser);
        const result = await executeQuery(queryUser, values);
        register.user_id = result.insertId;
        await registerService.addRegister(register);
        return result;
    }
}
