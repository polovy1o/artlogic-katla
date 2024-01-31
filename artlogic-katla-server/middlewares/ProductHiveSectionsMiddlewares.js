import { param } from "express-validator"
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
    ]
}

export default productHiveSectionsMiddlewares;