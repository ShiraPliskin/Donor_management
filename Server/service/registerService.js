
import { executeQuery } from './db.js';
import {addQuery,deleteQuery,getByIdQuery,updateQuery} from './querys.js'

export class RegisterService {


    async getRegister(username) {
        const queryRegister = getByIdQuery("register","username");
        const result =  await executeQuery(queryRegister, [username]);
        return result;
    }

    async addRegister(newRegister) {
        const queryRegister = addQuery("register",newRegister);
        const values = Object.values(newRegister);
        const result =  await executeQuery(queryRegister, values);
        return result;
    }

    async deleteRegister(username) {
        console.log("in delete register before delete");
        const queryRegister = deleteQuery("register","username");
        const result =  await executeQuery(queryRegister, [username]);
        console.log("in registers service in delete register, username: "+ username);
        return result;
    }
    async updateRegister(updatePassword,username) {
        const queryRegister = updateQuery("register",updatePassword,"username");
        const values =[updatePassword["password"],username]
        const result =  await executeQuery(queryRegister, values);
        return result;
    }
}


