import RequestedResourceNotFoundError from "../errors/RequestedResourceNotFoundError.js";
import productHiveSectionsService from "../services/ProductHiveSectionsService.js"

class ProductHiveSectionsController {
    async getHiveSections(req, res, next) {
        try {
            const hives = await productHiveSectionsService.getHiveSections()
            res.json(hives)
        } catch (err) {
            next(err)
        }
    }

    async getHiveSection(req, res, next) {
        try {
            const hive = await productHiveSectionsService.getHiveSection(req.params.sectionId);
            if (!hive) {
                throw new RequestedResourceNotFoundError()
            }
            res.json(hive)
        } catch (err) {
            next(err)
        }
    }

    async setHiveSectionStatus(req, res, next) {
        try {
            const exists = await productHiveSectionsService.setHiveSectionStatus(req.params.sectionId, req.params.deletedStatus);
            if (!exists) {
                throw new RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch (err) {
            next(err)
        }
    }
}

const productHiveSectionsController = new ProductHiveSectionsController()

export default productHiveSectionsController