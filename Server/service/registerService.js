
import { executeQuery } from './db.js';
import {addQuery,deleteQuery,getByIdQuery,updateQuery} from '../queries/genericQueries.js'
import crypto from 'crypto';

const encryption = async(item) => {
    const algorithm = "sha256";
    return crypto.createHash(algorithm).update(item).digest("base64");
}

export class RegisterService {

    async getRegisterById(id) {
        const queryRegister = getByIdQuery("register","user_id");
        const result =  await executeQuery(queryRegister, [id]);
        return result;
    }

    async getRegister(passwordRegister,id) {
        const queryRegister = getByIdQuery("register","user_id");
        const result =  await executeQuery(queryRegister, [id]);
        if(!result[0] || result.length < 0) throw new Error("Invalid email");
        const encodedPassword = await encryption(passwordRegister);
        if(result[0].password!==encodedPassword) throw new Error("אין אפשרות לערוך פעולה זו");        
        return { type: 'Success', result};
    }

    async addRegister(register) {
        register.password = await encryption(register.password);
        const queryRegister = addQuery("register",register);
        const values = Object.values(register);
        const result =  await executeQuery(queryRegister, values);
        return result;
    }

    async deleteRegister(idValue,idKey) {
        const queryRegister = deleteQuery("register",idKey);
        const result =  await executeQuery(queryRegister, [idValue]);
        return result;
    }

    async updateRegister(updatedRegister, id) {
        const resultItem = await this.getRegisterById(id);
        if (!resultItem[0]) throw new Error("Error receiving data");
            const encodedPrevPassword = await encryption(updatedRegister.prevPassword)
        if(resultItem[0].password!==encodedPrevPassword) throw new Error("Incorrect previous password")
            const encodedPassword = await encryption(updatedRegister.password)
        const updatePassword = {
            password: encodedPassword
        };  
        const queryRegister = updateQuery("register",updatePassword,"user_id");
        const values =[updatePassword["password"],id]
        const result =  await executeQuery(queryRegister, values);
        return result;
    }
}


