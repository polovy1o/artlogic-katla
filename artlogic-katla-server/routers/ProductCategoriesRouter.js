import { Router } from 'express'
import productCategoriesController from '../controllers/ProductCategoriesController.js'
import productCategoriesMiddlewares from '../middlewares/ProductCategoriesMiddlewares.js'

const productCategoriesRouter = new Router()

productCategoriesRouter.get('/', productCategoriesController.getCategories)
productCategoriesRouter.post('/', productCategoriesMiddlewares.createCategory, productCategoriesController.createCategory)
productCategoriesRouter.delete(
    '/:categoryId', 
    productCategoriesMiddlewares.deleteCategory, 
    productCategoriesController.deleteCategory
)
productCategoriesRouter.get(
    '/:categoryId', 
    productCategoriesMiddlewares.getCategory, 
    productCategoriesController.getCategory
)
productCategoriesRouter.get(
    '/:categoryId/products', 
    productCategoriesMiddlewares.getCategoryProducts, 
    productCategoriesController.getCategoryProducts
)
productCategoriesRouter.put(
    '/:categoryId', 
    productCategoriesMiddlewares.updateCategory, 
    productCategoriesController.updateCategory
)
productCategoriesRouter.put(
    '/:categoryId/status/:deletedStatus',
    productCategoriesMiddlewares.setCategoryStatus,
    productCategoriesController.setCategoryStatus
)

export default productCategoriesRouter