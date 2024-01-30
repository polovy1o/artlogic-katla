import RequestedResourceHasConflictError from '../errors/RequestedResourceHasConflictError.js'
import RequestedResourceNotFoundError from '../errors/RequestedResourceNotFoundError.js'
import productCategoriesService from '../services/ProductCategoriesService.js'

class ProductCategoriesController {
    async getCategories(req, res, next) 
    {
        try {
            const categories = await productCategoriesService.getCategories()
            res.json(categories)
        } catch(err) {
            next(err)
        }
    }

    async createCategory(req, res, next)
    {
        try {
            await productCategoriesService.createCategory(req.body.createRequest)
            res.sendStatus(201)
        } catch(err) {
            next(err)
        }
    }

    async deleteCategory(req, res, next)
    {
        try {
            const id = req.params.categoryId;
            const category = await productCategoriesService.getCategory(id)

            if (!category) {
                throw new RequestedResourceNotFoundError()
            }
            if (!category.isDeleted) {
                throw new RequestedResourceHasConflictError()
            }

            await productCategoriesService.deleteCategory(id)
            res.sendStatus(204)
        } catch(err) {
            next(err)
        }
    }

    async getCategory(req, res, next)
    {
        try {
            const category = await productCategoriesService.getCategory(req.params.categoryId)
            if (!category) {
                throw RequestedResourceNotFoundError()
            }
            res.json(category)
        } catch(err) {
            next(err)
        }
    }

    async updateCategory(req, res, next)
    {
        try {
            const exists = await productCategoriesService.updateCategory(req.params.categoryId, req.body.updateRequest)
            if (!exists) {
                throw RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch(err) {
            next(err)
        }
    }

    async setCategoryStatus(req, res, next)
    {
        try {
            const exists = await productCategoriesService.setCategoryStatus(req.params.categoryId, req.params.deletedStatus)
            if (!exists) {
                throw RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch(err) {
            next(err)
        }
    }

    async getCategoryProducts(req, res, next)
    {
        try {
            const products = await productCategoriesService.getCategoryProducts(req.params.categoryId)
            res.json(products)
        } catch(err) {
            next(err)
        }
    }
}

const productCategoriesController = new ProductCategoriesController()

export default productCategoriesController