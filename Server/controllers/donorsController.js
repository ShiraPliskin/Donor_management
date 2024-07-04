import { DonorsService } from '../service/donorsService.js'

export class DonorsController {

    async getDonors(req, res, next) {
        try {
            const donorsService = new DonorsService();
            const resultItems = await donorsService.getDonors(req.query);
            return res.json(resultItems);
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
            return res.json({ data: resultItems });
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
            const resultItems = await donorsService.updateDonor(req.body, req.params.id);
            return res.json(resultItems);
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
            return res.json({data: req.params.id });
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
            res.json({ insertId: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
