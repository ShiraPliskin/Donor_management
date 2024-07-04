import { ContactsService } from '../service/contactsService.js'

export class ContactsController {

    async getContacts(req, res, next) {
        try {
            const contactsService = new ContactsService();
            const resultItems = await contactsService.getContacts(req.query);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getContactById(req, res, next) {
        try {
            const contactsService = new ContactsService();
            const resultItems = await contactsService.getContactById(req.params.id);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateContact(req, res, next) {
        try {
            const contactsService = new ContactsService();
            const resultItems = await contactsService.updateContact(req.body, req.params.id);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteContact(req, res, next) {
        try {
            const contactsService = new ContactsService();
            await contactsService.deleteContact("id",req.params.id);
            return res.json({ data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addContact(req, res, next) {
        try {
            const contactsService = new ContactsService();
            const resultItem = await contactsService.addContact(req.body);
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
