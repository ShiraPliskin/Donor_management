import express from "express";
import { DonorsController } from '../controllers/donorsController.js'
const donorsRouter = express.Router();

const donorscontroller = new DonorsController();

donorsRouter.get('/', donorscontroller.getDonors)
donorsRouter.get("/:id", donorscontroller.getDonorById)
donorsRouter.post("/", donorscontroller.addDonor)
donorsRouter.delete("/:id", donorscontroller.deleteDonor)
donorsRouter.put("/:id", donorscontroller.updateDonor)

export{
    donorsRouter
}