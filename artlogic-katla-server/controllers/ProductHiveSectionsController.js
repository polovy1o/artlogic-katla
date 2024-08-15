import RequestedResourceHasConflictError from "../errors/RequestedResourceHasConflictError.js";
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

    async createHiveSection(req, res, next)
    {
        try {
            await productHiveSectionsService.createHiveSection(req.body)
            res.sendStatus(201)
        } catch(err) {
            next(err)
        }
    }

    async deleteHiveSection(req, res, next)
    {
        try {
            const id = req.params.sectionId;
            const section = await productHiveSectionsService.getHiveSection(id)

            if (!section) {
                throw new RequestedResourceNotFoundError()
            }
            if (!section.isDeleted) {
                throw new RequestedResourceHasConflictError()
            }

            await productHiveSectionsService.deleteHiveSection(id)
            res.sendStatus(204)
        } catch(err) {
            next(err)
        }
    }

    async updateHiveSection(req, res, next)
    {
        try {
            const exists = await productHiveSectionsService.updateHiveSection(req.params.sectionId, req.body)
            if (!exists) {
                throw RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch(err) {
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