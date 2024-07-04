
// import { executeQuery } from './db.js';
// import { addQuery, deleteQuery, getByIdQuery, updateQuery } from './querys.js'
// import crypto from 'crypto';

// export class RegisterService {

//     async getRegisterById(id) {
//         const queryRegister = getByIdQuery("register", "user_id");
//         const result = await executeQuery(queryRegister, [id]);
//         console.log("qqqqqq " + result[0].password)
//         return result;
//     }

//     async getRegister(passwordRegister, id) {
//         const queryRegister = getByIdQuery("register", "user_id");
//         const result = await executeQuery(queryRegister, [id]);
//         if (!result || result.length < 0) throw new Error("not valid Register")

//         let algorithm = "sha256";
//         let key = passwordRegister;
//         let digest = crypto.createHash(algorithm).update(key).digest("base64");
//         if (result[0].password !== digest) throw new Error("")


//     }

//     async addRegister(register) {
//         let algorithm = "sha256"
//         let key = register.password;
//         let encoded = crypto.createHash(algorithm).update(key).digest("base64");
//         register.password = encoded;
//         const queryRegister = addQuery("register", register);
//         const values = Object.values(register);
//         const result = await executeQuery(queryRegister, values);
//         return result;
//     }

//     async deleteRegister(idValue, idKey) {
//         const queryRegister = deleteQuery("register", idKey);
//         const result = await executeQuery(queryRegister, [idValue]);
//         return result;
//     }

//     async updateRegister(updatedRegister, id) {
//         let digest, key, algorithm;
//         const resultItem = await this.getRegisterById(id);
//         if (!resultItem[0]) throw new Error("error in getRegister")
//         algorithm = "sha256";
//         key = updatedRegister.prevPassword;
//         digest = crypto.createHash(algorithm).update(key).digest("base64");
//         if (resultItem[0].password !== digest) throw new Error("error in getRegister")

//         key = updatedRegister.password;
//         console.log(" old digest  " + digest);
//         digest = crypto.createHash(algorithm).update(key).digest("base64");
//         console.log("new digest  " + digest);
//         const updatePassword = {
//             password: digest
//         };
//         const queryRegister = updateQuery("register", updatePassword, "user_id");
//         const values = [updatePassword["password"], id]
//         const result = await executeQuery(queryRegister, values);
//         return result;
//     }
// }







// async updateRegister(req, res, next) {
//     try {
//         const registerService = new RegisterService();
//         const { result } = await registerService.updateRegister(req.body, req.params.id);

//         res.status(200).json({ status: 200, data: result });

//     }
//     catch (ex) {
//         const err = {}
//         err.statusCode = 500;
//         err.message = ex;
//         next(err)
//     }
// }



// async getRegister(req, res, next) {
//     try {
//         const registerService = new RegisterService();
//         await registerService.getRegister(req.body.password, req.params.id);
//         res.send()
//     }
//     catch (ex) {
//         const err = {}
//         err.statusCode = 500;
//         err.message = ex;
//         next(err)
//     }
// }

//RController

// import { cwd } from 'process';
// import { RegisterService } from '../service/registerService.js';
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// import { error } from 'console';
// import 'dotenv/config';

// export class RegisterController {


//     // async getRegister(req, res,next) {
//     //     try {
//     //         const registerService = new RegisterService();
//     //         const startIndex = (req.query.page_ - 1) * req.query.limit_;
//     //         const resultItem = await registerService.getRegister(req.query.id,req.query.limit_,startIndex);
//     //         console.log(resultItem[0].password);
//     //         res.status(200).json({ status: 200, data: resultItem });
//     //     }
//     //     catch (ex) {
//     //         const err = {}
//     //         err.statusCode = 500;
//     //         err.message = ex;
//     //         next(err)
//     //     }
//     // }


//     // async addRegister(req, res, next) {
//     //     try {
//     //         const registerService = new RegisterService();
//     //         const resultItem=await registerService.addRegister(req.body);
//     //         resultItem === undefined ?res.status(500).json({ status: 500}):
//     //         res.status(200).json({ status: 200 });
//     //     }
//     //     catch (ex) {
//     //         const err = {}
//     //         err.statusCode = 500;
//     //         err.message = ex;
//     //         next(err)
//     //     }
//     // }


//     async getRegister(req, res, next) {
//         try {
//             const registerService = new RegisterService();
//             await registerService.getRegister(req.body.password, req.params.id);
//             res.send()
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     // async deleteRegister(req, res,next) {
//     //     try {
//     //         const registerService = new RegisterService();
//     //         await registerService.deleteRegister(req.query.id);
//     //         return res.status(200).json({ status: 200, data: req.query.id });
//     //     }
//     //     catch (ex) {
//     //         const err = {}
//     //         err.statusCode = 500;
//     //         err.message = ex;
//     //         next(err)
//     //     }
//     // }

//     async updateRegister(req, res, next) {
//         try {
//             const registerService = new RegisterService();
//             const { result } = await registerService.updateRegister(req.body, req.params.id);

//             res.status(200).json({ status: 200, data: result });

//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

// }