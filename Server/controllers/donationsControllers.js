import { DonationsService } from '../service/donationsService.js'

export class DonationsController {

    async getDonations(req, res, next) {
        try {
            const donationsService = new DonationsService();
            const resultItems = await donationsService.getDonations(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getDonationById(req, res, next) {
        try {
            const donationsService = new DonationsService();
            const resultItems = await donationsService.getDonationById(req.params.id);
            return res.status(200).json({ status: 200, data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateDonation(req, res, next) {
        try {
            const donationsService = new DonationsService();
            const resultItems = await donationsService.updateDonation(req.body, req.params.id);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteDonation(req, res, next) {
        try {
            const donationsService = new DonationsService();
            await donationsService.deleteDonation("id",req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addDonation(req, res, next) {
        try {
            const donationsService = new DonationsService();
            const resultItem = await donationsService.addDonation(req.body);
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
