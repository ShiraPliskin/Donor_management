import { RegisterService } from '../service/registerService.js';
import crypto from 'crypto';
export class RegisterController {

    // async getRegister(req, res,next) {
    //     try {
    //         const registerService = new RegisterService();
    //         const startIndex = (req.query.page_ - 1) * req.query.limit_;
    //         const resultItem = await registerService.getRegister(req.query.username,req.query.limit_,startIndex);
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
            const resultItem = await registerService.getRegister(req.body.username);                 
            let algorithm = "sha256"                
            let key = req.body.password;
            let digest2 = crypto.createHash(algorithm).update(key).digest("base64")
            const username= req.body.username;
            const newRegister = {
               username: username,
               password: digest2
            };
            console.log("newRegister in cont"+newRegister);
            await registerService.addRegister(newRegister);
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
            const resultItem = await registerService.getRegister(req.body.username);
            if(resultItem[0])
            {
                let algorithm = "sha256";
                let key = req.body.password;
                let digest= crypto.createHash(algorithm).update(key).digest("base64"); 
                if(resultItem[0].password===digest)
                {
                    console.log(resultItem[0].username)
                    res.status(200).json({ status: 200});
                }
                else{
                    res.status(500).json({ status: 500});
                }
            }
            else{
                res.status(204).json({ status: 204});
            }

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteRegister(req, res,next) {
        try {
            console.log("register"+req.query.username);
            const registerService = new RegisterService();
            await registerService.deleteRegister(req.query.username);
            return res.status(200).json({ status: 200, data: req.query.username });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateRegister(req, res,next) {
        try {
            const registerService = new RegisterService();
            let digest;
            let algorithm;
            const resultItem = await registerService.getRegister(req.body.username);
            if(resultItem[0])
            {
                console.log("nkh"+resultItem[0].username);
                algorithm = "sha256";
                let key = req.body.prevPassword;
                digest= crypto.createHash(algorithm).update(key).digest("base64"); 
                if(resultItem[0].password!==digest)
                {
                    console.log("qqqqqqqqqqqqqqqqqqqqq");
                    res.status(500).json({ status: 500});
                }

            }
            else{
                res.status(500).json({ status: 500});
            }
            let key = req.body.password;
            console.log(" old digest  "    +digest);
            digest= crypto.createHash(algorithm).update(key).digest("base64"); 
            console.log("new digest  "    +digest);
            const updatePassword = {
                password: digest
            };            
            await registerService.updateRegister(updatePassword,req.body.username);
            res.status(200).json({ status: 200, data: req.params.username });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}