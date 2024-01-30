import { param, body } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productsMiddlewares = {
    createProduct: [
        body('createRequest').exists().withMessage('createRequest is required'),
        ValidationMiddleware
    ],
    deleteProduct: [
        param('productId').isInt().withMessage('Product ID must be INT'),
        ValidationMiddleware
    ],
    getProduct: [
        param('productId').isInt().withMessage('Product ID must be INT'),
        ValidationMiddleware
    ],
    updateProduct: [
        param('productId').isInt().withMessage('Product ID must be INT'),
        body('updateRequest').exists().withMessage('updateRequest is required'),
        ValidationMiddleware
    ],
    setProductStatus: [
        param('productId').isInt().withMessage('Product ID must be INT'),
        param('deletedStatus').isBoolean().withMessage('Deleted status must be BOOLEAN'),
        ValidationMiddleware
    ]
}

export default productsMiddlewares;