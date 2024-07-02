import express from 'express';
import path from 'path';
import multer from 'multer';
import { GiftsController } from '../controllers/giftsController.js';

const giftsRouter = express.Router();
const giftsController = new GiftsController();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).single('image');

giftsRouter.get('/', giftsController.getGifts);
giftsRouter.get("/:id", giftsController.getGiftById);
giftsRouter.post("/upload", upload, giftsController.uploadImage);
giftsRouter.post("/", giftsController.addGift);
giftsRouter.delete("/:id", giftsController.deleteGift);
giftsRouter.put("/:id", giftsController.updateGift);

export { giftsRouter };