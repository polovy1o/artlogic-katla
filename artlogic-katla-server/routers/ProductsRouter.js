import { Router } from 'express'
import productsController from '../controllers/ProductsController.js'
import productsMiddlewares from '../middlewares/ProductsMiddlewares.js'

const productsRouter = new Router()

productsRouter.get('/', productsController.getProducts)
productsRouter.post('/', productsMiddlewares.createProduct, productsController.createProduct)
productsRouter.delete('/:productId', productsMiddlewares.deleteProduct, productsController.deleteProduct)
productsRouter.get('/:productId', productsMiddlewares.getProduct, productsController.getProduct)
productsRouter.put('/:productId', productsMiddlewares.updateProduct, productsController.updateProduct)
productsRouter.put(
    '/:productId/status/:deletedStatus',
    productsMiddlewares.setProductStatus,
    productsController.setProductStatus
)

export default productsRouter