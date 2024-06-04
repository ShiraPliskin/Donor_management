import { cwd } from 'process';
import { RegisterService } from '../service/registerService.js';
import crypto from 'crypto';
import { error } from 'console';
export class RegisterController {

    // async getRegister(req, res,next) {
    //     try {
    //         const registerService = new RegisterService();
    //         const startIndex = (req.query.page_ - 1) * req.query.limit_;
    //         const resultItem = await registerService.getRegister(req.query.id,req.query.limit_,startIndex);
    //         console.log(resultItem[0].password);
    //         res.status(200).json({ status: 200, data: resultItem });
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }
    
    
    async addRegister(req, res, next) {
        try {
            const registerService = new RegisterService();
            const resultItem=await registerService.addRegister(req.body);
            resultItem === undefined ?res.status(500).json({ status: 500}):
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async getRegister(req, res, next) {
        try {
            const registerService = new RegisterService();
            const {type, statusCode, result} = await registerService.getRegister(req.body.password,req.params.id);
            if (type === 'Error'){
                return res.status(statusCode).json({status: statusCode});
              }
            else 
                res.status(200).json({ status: 200 });

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    // async deleteRegister(req, res,next) {
    //     try {
    //         const registerService = new RegisterService();
    //         await registerService.deleteRegister(req.query.id);
    //         return res.status(200).json({ status: 200, data: req.query.id });
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    async updateRegister(req, res,next) {
        try {
            const registerService = new RegisterService();  
            const {type, statusCode, result} = await registerService.updateRegister(req.body,req.params.id);
            if (type === 'Error'){
                return res.status(statusCode).json({status: statusCode});
              }
            else 
                res.status(200).json({ status: 200, data:result });

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    
}