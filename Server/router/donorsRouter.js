import express from "express";
import { DonorsController } from '../controllers/donorsController.js';
import {authenticateToken} from '../middleware/authenticateToken.js'

const donorsRouter = express.Router();

const donorscontroller = new DonorsController();

donorsRouter.get('/',authenticateToken, donorscontroller.getDonors)
donorsRouter.get("/:id",authenticateToken, donorscontroller.getDonorById)
donorsRouter.post("/",authenticateToken, donorscontroller.addDonor)
donorsRouter.delete("/:id",authenticateToken, donorscontroller.deleteDonor)
donorsRouter.put("/:id",authenticateToken, donorscontroller.updateDonor)

export{
    donorsRouter
}