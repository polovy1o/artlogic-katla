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
productHivesRouter.put(
    '/:hiveId/status/:deletedStatus', 
    productHivesMiddlewares.setHiveStatus,
    productHivesController.setHiveStatus
)

export default productHivesRouter