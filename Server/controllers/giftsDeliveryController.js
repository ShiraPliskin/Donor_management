
import { GiftsDeliveryService } from '../service/giftsDeliveryService.js';

export class GiftsDeliveryController {

    async getGiftsDelivery(req, res, next) {
        try {
            const giftsDeliveryService = new GiftsDeliveryService();
            const resultItems = await giftsDeliveryService.getGiftsDelivery(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getGiftDeliveryById(req, res, next) {
        try {
            const giftsDeliveryService = new GiftsDeliveryService();
            const resultItems = await giftsDeliveryService.getGiftDeliveryById(req.params.id);
            return res.status(200).json({ status: 200, data: resultItems });
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
            return res.status(200).json(resultItems);
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
            return res.status(200).json({ status: 200, data: req.params.id });
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
            res.status(200).json({ status: 200 });

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
