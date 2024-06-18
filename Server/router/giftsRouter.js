import express from "express";
import { GiftsController } from '../controllers/giftsController.js'
const giftsRouter = express.Router();

const giftscontroller = new GiftsController();

giftsRouter.get('/', giftscontroller.getGifts)
giftsRouter.get("/:id", giftscontroller.getGiftById)
giftsRouter.post("/", giftscontroller.addGift)
giftsRouter.delete("/:id", giftscontroller.deleteGift)
giftsRouter.put("/:id", giftscontroller.updateGift)

export{
    giftsRouter
}