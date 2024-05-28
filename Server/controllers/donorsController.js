import { DonorsService } from '../service/donorsService.js'

export class DonorsController {

    async getDonors(req, res, next) {
        try {
            const donorsService = new DonorsService();
            const resultItems = await donorsService.getDonors(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getDonorById(req, res, next) {
        try {
            const donorsService = new DonorsService();
            const resultItems = await donorsService.getDonorById(req.params.id);
            return res.status(200).json({ status: 200, data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateDonor(req, res, next) {
        try {

            const donorsService = new DonorsService();
            const resultItems = await donorsService.updateDonor(req.body);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async deleteDonor(req, res, next) {
        try {
            const donorsService = new DonorsService();
            await donorsService.deleteDonor("id",req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addDonor(req, res, next) {
        try {
            const donorsService = new DonorsService();
            const resultItem = await donorsService.addDonor(req.body);
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