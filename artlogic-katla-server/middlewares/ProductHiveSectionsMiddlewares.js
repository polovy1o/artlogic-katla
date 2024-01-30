import { param } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productHiveSectionsMiddlewares = {
    getHiveSection: [
        param('sectionId')
            .isInt().withMessage('Hive Section ID must be INT'),
        ValidationMiddleware
    ],
    setHiveSectionStatus: [
        param('sectionId')
            .isInt().withMessage('Hive Section ID must be INT'),
        param('deletedStatus')
            .isBoolean().withMessage('Deleted status must be BOOLEAN'),
        ValidationMiddleware
    ]
}

export default productHiveSectionsMiddlewares;