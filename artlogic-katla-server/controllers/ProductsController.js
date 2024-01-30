import RequestedResourceHasConflictError from '../errors/RequestedResourceHasConflictError.js'
import RequestedResourceNotFoundError from '../errors/RequestedResourceNotFoundError.js'
import productsService from '../services/ProductsService.js'

class ProductsController {
    async getProducts(req, res, next) 
    {
        try {
            const products = await productsService.getProducts()
            res.json(products)
        } catch (err) {
            next(err)
        }
    }

    async createProduct(req, res, next)
    {
        try {
            await productsService.createProduct(req.body.createRequest)
            res.sendStatus(201)
        } catch (err) {
            next(err)
        }
    }

    async deleteProduct(req, res, next) 
    {
        try {
            const id = req.params.productId;
            const product = await productsService.getProduct(id)

            if (!product) {
                throw new RequestedResourceNotFoundError()
            }

            if (!product.isDeleted) {
                throw new RequestedResourceHasConflictError()
            }
            await productsService.deleteProduct(req.params.productId)
            res.sendStatus(204)
        } catch (err) {
            next(err)
        }
    }

    async getProduct(req, res, next)
    {
        try {
            const product = await productsService.getProduct(req.params.productId)
            if (!product) {
                throw new RequestedResourceNotFoundError()
            }
            res.json(product)
        } catch (err) {
            next(err)
        }
    }

    async updateProduct(req, res, next)
    {
        try {
            const exists = await productsService.updateProduct(req.params.productId, req.body.updateRequest)
            if (!exists) {
                throw new RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch (err) {
            next(err)
        }
    }

    async setProductStatus(req, res, next)
    {
        try {
            const exists = await productsService.setProductStatus(req.params.productId, req.params.deletedStatus)
            if (!exists) {
                throw new RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch (err) {
            next(err)
        }
    }
}

const productsController = new ProductsController()

export default productsController