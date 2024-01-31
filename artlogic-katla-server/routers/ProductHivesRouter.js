import { Router } from 'express'
import productHivesController from '../controllers/ProductHivesController.js'
import productHivesMiddlewares from '../middlewares/ProductHivesMiddlewares.js'

const productHivesRouter = new Router()

productHivesRouter.get('/', productHivesController.getHives)
productHivesRouter.get(
    '/:hiveId', 
    productHivesMiddlewares.getHive, 
    productHivesController.getHive
)
productHivesRouter.get(
    '/:hiveId/sections', 
    productHivesMiddlewares.getHiveSections,
    productHivesController.getHiveSections
)
productHivesRouter.post(
    '/', 
    productHivesMiddlewares.createHive, 
    productHivesController.createHive
)
productHivesRouter.delete(
    '/:hiveId', 
    productHivesMiddlewares.deleteHive, 
    productHivesController.deleteHive
)
productHivesRouter.put(
    '/:hiveId', 
    productHivesMiddlewares.updateHive,
    productHivesController.updateHive
)

productHivesRouter.put(
    '/:hiveId/status/:deletedStatus', 
    productHivesMiddlewares.setHiveStatus,
    productHivesController.setHiveStatus
)

export default productHivesRouter