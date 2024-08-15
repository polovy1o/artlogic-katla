import { param, body } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productHiveSectionsMiddlewares = {
    getHiveSection: [
        param('sectionId')
            .isInt({min: 1}).withMessage('Hive Section ID must be INT'),
        ValidationMiddleware
    ],
    setHiveSectionStatus: [
        param('sectionId')
            .isInt({min: 1}).withMessage('Hive Section ID must be INT'),
        param('deletedStatus')
            .isBoolean().withMessage('Deleted status must be BOOLEAN'),
        ValidationMiddleware
    ],
    createHiveSection: [
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ max: 60 }).withMessage('Name length must be < 60'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        body('hiveId').isInt().withMessage('Hive ID must be INT'),
        ValidationMiddleware
    ],
    deleteHiveSection: [
        param('sectionId').isInt({min: 1}).withMessage('Section ID must be INT'),
        ValidationMiddleware
    ],
    updateHiveSection: [
        param('sectionId').isInt({min: 1}).withMessage('Section ID must be INT'),
        body('name')
            .exists().withMessage('Name is required').bail()
            .isLength({ max: 60 }).withMessage('Name length must be < 60'),
        body('code')
            .exists().withMessage('Code is required').bail()
            .isLength({ min: 5, max: 5}).withMessage('Code length must be = 5'),
        ValidationMiddleware
    ]
}

export default productHiveSectionsMiddlewares;