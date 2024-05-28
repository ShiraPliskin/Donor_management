import { DonorsService } from '../service/donorsService.js'

export class DonorsController {
    
    async getDonors(req, res) {
        try {
            const donorsService = new DonorsService();
            const queryParams = req.query;
            const resultItems = await donorsService.get(queryParams, getDonorByConditionQuery);
            return res.status(200).json(resultItems);
        } 
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getDonorById(req, res) {
        try {
            const donorsService = new DonorsService();
            const resultItem = await donorsService.getById(req.params.id, getCommentByIdQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addDonor(req, res) {
        try {
            const donorsService = new DonorsService();
            const resultItem = await donorsService.add(req.body, addCommentQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteDonor(req, res) {
        try {
            const donorsService = new DonorsService();
            await donorsService.delete(req.params.id, deleteCommentQuery);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateDonor(req, res) {
        try {
            const donorsService = new DonorsService();
            await donorsService.update(req.body, req.params.id, updateCommentQuery);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}