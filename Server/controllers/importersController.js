import { ImportersService } from '../service/importersService.js'

export class ImportersController {

    async getImporters(req, res, next) {
        try {
            const importersService = new ImportersService();
            const resultItems = await importersService.getImporters(req.query);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getImporterById(req, res, next) {
        try {
            const importersService = new ImportersService();
            const resultItems = await importersService.getImporterById(req.params.id);
            return res.status(200).json({ status: 200, data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateImporter(req, res, next) {
        try {
            const importersService = new ImportersService();
            const resultItems = await importersService.updateImporter(req.body, req.params.id);
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteImporter(req, res, next) {
        try {
            const importersService = new ImportersService();
            await importersService.deleteImporter("id",req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addImporter(req, res, next) {
        try {
            const importersService = new ImportersService();
            const resultItem = await importersService.addImporter(req.body);
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