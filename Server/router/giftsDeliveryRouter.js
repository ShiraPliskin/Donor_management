import express from "express";
import { GiftsDeliveryController } from "../controllers/giftsDeliveryController.js";

const giftsDeliveryRouter = express.Router();
const giftsDeliveryController = new GiftsDeliveryController();

giftsDeliveryRouter.get('/', giftsDeliveryController.getGiftsDelivery)
giftsDeliveryRouter.get("/:id", giftsDeliveryController.getGiftDeliveryById)
giftsDeliveryRouter.post("/", giftsDeliveryController.addGiftDelivery)
giftsDeliveryRouter.delete("/:id", giftsDeliveryController.deleteGiftDelivery)
giftsDeliveryRouter.put("/:id", giftsDeliveryController.updateGiftDelivery)

export{
    giftsDeliveryRouter
}
