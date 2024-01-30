import { param, body } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productCategoriesMiddlewares = {
    createCategory: [
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ min: 4, max: 60 }).withMessage('Name length must be <= 60 and >= 4'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        body('description').optional().isLength({max: 300}).withMessage('Description must be < 300'),
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
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ min: 4, max: 60 }).withMessage('Name length must be < 60'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        body('description').optional().isLength({max: 300}).withMessage('Description must be < 300'),
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