import express from "express";
import { GiftsDeliveryController } from "../controllers/giftsDeliveryController.js";

const giftsDeliveryRouter = express.Router();
const giftsDeliveryController = new GiftsDeliveryController();

giftsDeliveryRouter.get("/donor/:id", giftsDeliveryController.getGiftDeliveryByDonorId)
giftsDeliveryRouter.get("/gift/:id", giftsDeliveryController.getGiftDeliveryByGiftId)
giftsDeliveryRouter.post("/", giftsDeliveryController.addGiftDelivery)
giftsDeliveryRouter.delete("/:id", giftsDeliveryController.deleteGiftDelivery)
giftsDeliveryRouter.put("/:id", giftsDeliveryController.updateGiftDelivery)

export{
    giftsDeliveryRouter
}
