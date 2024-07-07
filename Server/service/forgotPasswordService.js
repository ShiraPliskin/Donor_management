
import { executeQuery } from './db.js';
import {updateQuery,patchQuery} from '../queries/genericQueries.js'
import crypto from 'crypto';
import otpGenerator from 'otp-generator';
import {sendOTPPasswordByEmail} from '../mail.js';
import { RegisterService } from './registerService.js';
import jwt from 'jsonwebtoken';

const registerService = new RegisterService();

const encryption = async(item) => {
    const algorithm = "sha256";
    return crypto.createHash(algorithm).update(item).digest("base64");
}


const signToken = (id) => {
    return jwt.sign({ email: id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    })
}
export class ForgotPasswordService {

    async forgotPassword(email, id) {
        const resultItem = await registerService.getRegisterById(id);
        if (!resultItem[0]) throw new Error("Error receiving data");
        const otp = otpGenerator.generate(6, {});
        console.log("otp from update: "+otp);
        sendOTPPasswordByEmail(email,otp);
        const encodedOtp = await encryption(otp);
        const query = updateQuery("register", { otp: encodedOtp }, "user_id");
        const result =  await executeQuery(query, [encodedOtp,id]);
        return {result:result, otp:otp};
    }
    

    async updateByOTP(updatedPassword, id) {
        const resultItem = await registerService.getRegisterById(id);
        if (!resultItem[0]) throw new Error("Error receiving data");
        let encodedOTP = await encryption(updatedPassword.otp);
        if(resultItem[0].otp!==encodedOTP) throw new Error("Incorrect previous password");
        let encodedPassword = await encryption(updatedPassword.password);
        const newPassword = {
            password: encodedPassword
        };  
        const queryRegister = updateQuery("register",newPassword,"user_id");
        const result =  await executeQuery(queryRegister, [newPassword.password,id]);
        return {...result, token: signToken(id)};
    }

}


