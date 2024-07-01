import express from "express";
import { DonationsController } from '../controllers/donationsControllers.jsx'
const donationsRouter = express.Router();

const donationsController = new DonationsController();

donationsRouter.get('/', donationsController.getDonations)
donationsRouter.get("/:id", donationsController.getDonationById)
donationsRouter.post("/", donationsController.addDonation)
donationsRouter.delete("/:id", donationsController.deleteDonation)
donationsRouter.put("/:id", donationsController.updateDonation)

export{
    donationsRouter
}