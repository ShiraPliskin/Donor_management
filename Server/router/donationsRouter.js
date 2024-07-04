import express from "express";
import { DonationsController } from '../controllers/donationsControllers.js';
import {authenticateToken} from '../middleware/authenticateToken.js'

const donationsRouter = express.Router();

const donationsController = new DonationsController();

donationsRouter.get('/',authenticateToken, donationsController.getDonations)
donationsRouter.get("/:id",authenticateToken, donationsController.getDonationById)
donationsRouter.post("/",authenticateToken, donationsController.addDonation)
donationsRouter.delete("/:id",authenticateToken, donationsController.deleteDonation)
donationsRouter.put("/:id",authenticateToken, donationsController.updateDonation)

export{
    donationsRouter
}