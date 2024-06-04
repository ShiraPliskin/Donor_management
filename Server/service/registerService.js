
import { executeQuery } from './db.js';
import {addQuery,deleteQuery,getByIdQuery,updateQuery} from './querys.js'
import crypto from 'crypto';

export class RegisterService {

    async getRegisterById(id) {
        const queryRegister = getByIdQuery("register","user_id");
        const result =  await executeQuery(queryRegister, [id]);
        console.log("qqqqqq "+result[0].password)
        return result;
    }

    async getRegister(passwordRegister,id) {
        const queryRegister = getByIdQuery("register","user_id");
        const result =  await executeQuery(queryRegister, [id]);
        if(result[0])
        {
            let algorithm = "sha256";
            let key = passwordRegister;
            let digest= crypto.createHash(algorithm).update(key).digest("base64");
            if(result[0].password===digest)
            {
                return {
                type: 'Success',
                statusCode: 200,
                result};
            }
            else
                return {type: 'Error', statusCode:500,result};
        }
        else
        {
            return {type: 'Error', statusCode:204,result};

        }
    }

    async addRegister(register) {
        let algorithm = "sha256"                
        let key = register.password;
        let digest2 = crypto.createHash(algorithm).update(key).digest("base64")
        const newRegister = {
            user_id:register.user_id,
            password: digest2
        };
        const queryRegister = addQuery("register",newRegister);
        console.log("qqqqqq "+queryRegister)
        const values = Object.values(newRegister);
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
        if(resultItem[0])
        {
            algorithm = "sha256";
            key = updatedRegister.prevPassword;
            digest= crypto.createHash(algorithm).update(key).digest("base64");
            if(resultItem[0].password!==digest)
            {
                return {type: 'Error', statusCode:500};
            }
        }
        else{
            return {type: 'Error', statusCode:500};
        }
        key = updatedRegister.password;
        console.log(" old digest  "    +digest);
        digest= crypto.createHash(algorithm).update(key).digest("base64"); 
        console.log("new digest  "    +digest);
        const updatePassword = {
            password: digest
        };  
        const queryRegister = updateQuery("register",updatePassword,"user_id");
        const values =[updatePassword["password"],id]
        const result =  await executeQuery(queryRegister, values);
        return result;
    }
}


