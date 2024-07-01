import express from "express";
import { ContactsController } from '../controllers/contactsController.js'
const contactsRouter = express.Router();

const contactsController = new ContactsController();

contactsRouter.get('/', contactsController.getContacts)
contactsRouter.get("/:id", contactsController.getContactById)
contactsRouter.post("/", contactsController.addContact)
contactsRouter.delete("/:id", contactsController.deleteContact)
contactsRouter.put("/:id", contactsController.updateContact)

export{
    contactsRouter
}