import { ForgotPasswordService } from '../service/forgotPasswordService.js';
export class ForgotPasswordController {

    async forgotPassword(req, res, next) {
        try {
            const forgotPasswordService = new ForgotPasswordService();
            const result = await forgotPasswordService.forgotPassword(req.body.email, req.params.id);
            return res.json(result);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateByOTP(req, res, next) {
        try {
            const forgotPasswordService = new ForgotPasswordService();
            const result  = await forgotPasswordService.updateByOTP(req.body, req.params.id);
            return res.cookie("token", result.token, { httpOnly: true, secure: true })
            .json(result );
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }



}