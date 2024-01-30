import { param, body } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productsMiddlewares = {
    createProduct: [
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ min: 4, max: 60 }).withMessage('Name length must be <= 60 and >= 4'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        body('categoryId').isInt().withMessage('Category ID must be INT'),
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
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ min: 4, max: 60 }).withMessage('Name length must be <= 60 and >= 4'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        body('categoryId').isInt().withMessage('Category ID must be INT'),
        ValidationMiddleware
    ],
    setProductStatus: [
        param('productId').isInt().withMessage('Product ID must be INT'),
        param('deletedStatus').isBoolean().withMessage('Deleted status must be BOOLEAN'),
        ValidationMiddleware
    ]
}

export default productsMiddlewares;