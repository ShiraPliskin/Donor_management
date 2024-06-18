import { GiftsService } from '../service/giftsService.js'

export class GiftsController {

    async getGifts(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItems = await giftsService.getGifts(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getGiftById(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItems = await giftsService.getGiftById(req.params.id);
            return res.status(200).json({ status: 200, data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateGift(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItems = await giftsService.updateGift(req.body, req.params.id);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteGift(req, res, next) {
        try {
            const giftsService = new GiftsService();
            await giftsService.deleteGift("id",req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addGift(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItem = await giftsService.addGift(req.body);
            res.status(200).json({ insertId: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
