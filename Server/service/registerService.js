
import { executeQuery } from './db.js';
import {addQuery,deleteQuery,getByIdQuery,updateQuery} from '../queries/genericQueries.js'
import crypto from 'crypto';

export class RegisterService {

    async getRegisterById(id) {
        const queryRegister = getByIdQuery("register","user_id");
        const result =  await executeQuery(queryRegister, [id]);
        return result;
    }

    async getRegister(passwordRegister,id) {
        const queryRegister = getByIdQuery("register","user_id");
        const result =  await executeQuery(queryRegister, [id]);
        if(!result[0] || result.length < 0) throw new Error("סיסמה לא תקינה")
        let algorithm = "sha256";
        let key = passwordRegister;
        let digest= crypto.createHash(algorithm).update(key).digest("base64");
        if(result[0].password!==digest) throw new Error("אין אפשרות לערוך פעולה זו");        
        return { type: 'Success', result};
    }

    async addRegister(register) {
        let algorithm = "sha256"                
        let key = register.password;
        let encoded = crypto.createHash(algorithm).update(key).digest("base64");
        register.password = encoded;
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
        let digest,key,algorithm;
        const resultItem = await this.getRegisterById(id);
        if (!resultItem[0]) throw new Error("שגיאה בקבלת הנתונים");
        algorithm = "sha256";
        key = updatedRegister.prevPassword;
        digest= crypto.createHash(algorithm).update(key).digest("base64");
        if(resultItem[0].password!==digest) throw new Error("אין אפשרת לערוך פעולה זו")
        key = updatedRegister.password;
        digest= crypto.createHash(algorithm).update(key).digest("base64"); 
        const updatePassword = {
            password: digest
        };  
        const queryRegister = updateQuery("register",updatePassword,"user_id");
        const values =[updatePassword["password"],id]
        const result =  await executeQuery(queryRegister, values);
        return result;
    }
}


