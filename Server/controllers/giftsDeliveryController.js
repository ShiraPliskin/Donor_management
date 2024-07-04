
import { GiftsDeliveryService } from '../service/giftsDeliveryService.js';

export class GiftsDeliveryController {
    
    async getGiftDeliveryByDonorId(req, res, next) {
        try {
            const giftsDeliveryService = new GiftsDeliveryService();
            const resultItems = await giftsDeliveryService.getGiftDeliveryByDonorId(req.params.id);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getGiftDeliveryByGiftId(req, res, next) {
        try {
            const giftsDeliveryService = new GiftsDeliveryService();
            const resultItems = await giftsDeliveryService.getGiftDeliveryByGiftId(req.params.id);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateGiftDelivery(req, res, next) {
        try {
            const giftsDeliveryService = new GiftsDeliveryService();
            const resultItems = await giftsDeliveryService.updateGiftDelivery(req.body, req.params.id);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteGiftDelivery(req, res, next) {
        try {
            const giftsDeliveryService = new GiftsDeliveryService();
            await giftsDeliveryService.deleteGiftDelivery("id",req.params.id);
            return res.json({data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addGiftDelivery(req, res, next) {
        try {
            const giftsDeliveryService = new GiftsDeliveryService();
            const resultItem = await giftsDeliveryService.addGiftDelivery(req.body);
            res.json({ status: 200 });

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
