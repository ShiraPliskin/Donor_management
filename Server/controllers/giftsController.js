import { GiftsService } from '../service/giftsService.js';
import 'dotenv/config'

export class GiftsController {
    async getGifts(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItems = await giftsService.getGifts(req.query);
            return res.status(200).json(resultItems);
        } catch (ex) {
            const err = { statusCode: 500, message: ex };
            next(err);
        }
    }

    async getGiftById(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItems = await giftsService.getGiftById(req.params.id);
            return res.status(200).json({ status: 200, data: resultItems });
        } catch (ex) {
            const err = { statusCode: 500, message: ex };
            next(err);
        }
    }

    async updateGift(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItems = await giftsService.updateGift(req.body, req.params.id);
            return res.status(200).json(resultItems);
        } catch (ex) {
            const err = { statusCode: 500, message: ex };
            next(err);
        }
    }

    async deleteGift(req, res, next) {
        try {
            const giftsService = new GiftsService();
            await giftsService.deleteGift("id", req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        } catch (ex) {
            const err = { statusCode: 500, message: ex };
            next(err);
        }
    }

    async addGift(req, res, next) {
        try {
            const giftsService = new GiftsService();
            const resultItem = await giftsService.addGift(req.body);
            res.status(200).json({ insertId: resultItem.insertId });
        } catch (ex) {
            const err = { statusCode: 500, message: ex };
            next(err);
        }
    }

    async uploadImage(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            const path = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
            console.log("path ",path)
            res.status(200).json({ filePath: path});
        } catch (ex) {
            const err = { statusCode: 500, message: ex };
            next(err);
        }
    }
}
