import { param, body } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productHivesMiddlewares = {
    getHive: [
        param('hiveId').isInt({min: 1}).withMessage('Hive ID must be INT'),
        ValidationMiddleware
    ],
    getHiveSections: [
        param('hiveId').isInt({min: 1}).withMessage('Hive ID must be INT'),
        ValidationMiddleware
    ],
    setHiveStatus: [
        param('hiveId').isInt({min: 1}).withMessage('Hive ID must be INT'),
        param('deletedStatus').isBoolean().withMessage('Deleted status must be BOOLEAN'),
        ValidationMiddleware
    ],
    createHive: [
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ max: 60 }).withMessage('Name length must be < 60'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        body('address')
            .exists().withMessage('Address is required').bail()
            .isLength({max: 300}).withMessage('Address must be < 300'),
        ValidationMiddleware
    ],
    deleteHive: [
        param('hiveId').isInt({min: 1}).withMessage('Hive ID must be INT'),
        ValidationMiddleware
    ],
    updateHive: [
        param('hiveId').isInt({min: 1}).withMessage('Hive ID must be INT'),
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ max: 60 }).withMessage('Name length must be < 60'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        body('address')
            .exists().withMessage('Address is required').bail()
            .isLength({max: 300}).withMessage('Address must be < 300'),
        ValidationMiddleware
    ]
}

export default productHivesMiddlewares;