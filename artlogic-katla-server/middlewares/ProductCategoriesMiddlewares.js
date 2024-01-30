import { param, body } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productCategoriesMiddlewares = {
    createCategory: [
        body('createRequest').exists().withMessage('createRequest is required'),
        ValidationMiddleware
    ],
    deleteCategory: [
        param('categoryId').isInt().withMessage('Category ID must be INT'),
        ValidationMiddleware
    ],
    getCategory: [
        param('categoryId').isInt().withMessage('Category ID must be INT'),
        ValidationMiddleware
    ],
    updateCategory: [
        param('categoryId').isInt().withMessage('Category ID must be INT'),
        body('updateRequest').exists().withMessage('updateRequest is required'),
        ValidationMiddleware
    ],
    setCategoryStatus: [
        param('categoryId').isInt().withMessage('Category ID must be INT'),
        param('deletedStatus').isBoolean().withMessage('Deleted status must be BOOLEAN'),
        ValidationMiddleware
    ],
    getCategoryProducts: [
        param('categoryId').isInt().withMessage('Category ID must be INT'),
        ValidationMiddleware
    ]
}

export default productCategoriesMiddlewares;