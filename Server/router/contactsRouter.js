import express from "express";
import { ContactsController } from '../controllers/contactsController.js'
const contactsRouter = express.Router();

const contactscontroller = new ContactsController();

contactsRouter.get('/', contactscontroller.getContacts)
contactsRouter.get("/:id", contactscontroller.getContactById)
contactsRouter.post("/", contactscontroller.addContact)
contactsRouter.delete("/:id", contactscontroller.deleteContact)
contactsRouter.put("/:id", contactscontroller.updateContact)

export{
    contactsRouter
}