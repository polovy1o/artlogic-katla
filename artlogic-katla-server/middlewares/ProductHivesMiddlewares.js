import { param } from "express-validator"
import ValidationMiddleware from "./ValidationMiddleware.js";

const productHivesMiddlewares = {
    getHive: [
        param('hiveId').isInt().withMessage('Hive ID must be INT'),
        ValidationMiddleware
    ],
    getHiveSections: [
        param('hiveId').isInt().withMessage('Hive ID must be INT'),
        ValidationMiddleware
    ],
    setHiveStatus: [
        param('hiveId').isInt().withMessage('Hive ID must be INT'),
        param('deletedStatus').isBoolean().withMessage('Deleted status must be BOOLEAN'),
        ValidationMiddleware
    ]
}

export default productHivesMiddlewares;