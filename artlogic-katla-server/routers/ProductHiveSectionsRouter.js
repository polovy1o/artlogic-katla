import { Router } from 'express'
import productHiveSectionsController from '../controllers/ProductHiveSectionsController.js'
import productHiveSectionsMiddlewares from '../middlewares/ProductHiveSectionsMiddlewares.js'

const productHiveSectionsRouter = new Router()

productHiveSectionsRouter.get('/', productHiveSectionsController.getHiveSections)
productHiveSectionsRouter.get(
    '/:sectionId', 
    productHiveSectionsMiddlewares.getHiveSection, 
    productHiveSectionsController.getHiveSection
)
productHiveSectionsRouter.put(
    '/:sectionId/status/:deletedStatus', 
    productHiveSectionsMiddlewares.setHiveSectionStatus,
    productHiveSectionsController.setHiveSectionStatus
)

export default productHiveSectionsRouter