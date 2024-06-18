import express from "express";
import { ImportersController } from '../controllers/importersController.js'
const importersRouter = express.Router();

const importerscontroller = new ImportersController();
importersRouter.get('/', importerscontroller.getImporters)
importersRouter.get("/:id", importerscontroller.getImporterById)
importersRouter.post("/", importerscontroller.addImporter)
importersRouter.delete("/:id", importerscontroller.deleteImporter)
importersRouter.put("/:id", importerscontroller.updateImporter)

export{
    importersRouter
}