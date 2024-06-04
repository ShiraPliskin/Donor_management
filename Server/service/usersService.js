import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'
import { RegisterService } from './registerService.js';
const registerService = new RegisterService;

export class UsersService {

    async getUsers(queryParams) {
        const query = getByConditionQuery("users",queryParams);
        const values = Object.values(queryParams);
        const result = await executeQuery(query, values);
        return result;
    }

    async getUserById(id) {
        const queryUser = getByIdQuery("users","user_id");
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async deleteUser(idKey,idValue) {
        await registerService.deleteRegister(idValue,"user_id");
        const queryUser = deleteQuery("users",`${idKey}`);
        const result =  await executeQuery(queryUser, [idValue]);
        return result;
    }

    async updateUser(updatedUser, id) {
        const query = updateQuery("users", updatedUser, "user_id");
        const values = Object.values(updatedUser);
        values.push(id);
        console.log(values);
        const result = await executeQuery(query, values);
        return result;
    }

    async addUser(newUser) {
        const values = Object.values(newUser);
        await registerService.addRegister(newUser);
        const queryUser = addQuery("users",newUser);
        const result =  await executeQuery(queryUser, values);
        return result;
    }
}
