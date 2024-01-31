import RequestedResourceHasConflictError from "../errors/RequestedResourceHasConflictError.js";
import RequestedResourceNotFoundError from "../errors/RequestedResourceNotFoundError.js";
import productHivesService from "../services/ProductHivesService.js"

class ProductHivesController {
    async getHives(req, res, next) {
        try {
            const hives = await productHivesService.getHives()
            res.json(hives)
        } catch (err) {
            next(err)
        }
    }

    async getHive(req, res, next) {
        try {
            const hive = await productHivesService.getHive(req.params.hiveId);
            if (!hive) {
                throw new RequestedResourceNotFoundError()
            }
            res.json(hive)
        } catch (err) {
            next(err)
        }
    }

    async getHiveSections(req, res, next) {
        try {
            const hiveSections = await productHivesService.getHiveSections(req.params.hiveId);
            res.json(hiveSections)
        } catch (err) {
            next(err)
        }
    }

    async createHive(req, res, next)
    {
        try {
            await productHivesService.createHive(req.body)
            res.sendStatus(201)
        } catch(err) {
            next(err)
        }
    }

    async deleteHive(req, res, next)
    {
        try {
            const id = req.params.hiveId;
            const hive = await productHivesService.getHive(id)

            if (!hive) {
                throw new RequestedResourceNotFoundError()
            }
            if (!hive.isDeleted) {
                throw new RequestedResourceHasConflictError()
            }

            await productHivesService.deleteHive(id)
            res.sendStatus(204)
        } catch(err) {
            next(err)
        }
    }

    async updateHive(req, res, next)
    {
        try {
            const exists = await productHivesService.updateHive(req.params.hiveId, req.body)
            if (!exists) {
                throw RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch(err) {
            next(err)
        }
    }

    async setHiveStatus(req, res, next) {
        try {
            const exists = await productHivesService.setHiveStatus(req.params.hiveId, req.params.deletedStatus);
            if (!exists) {
                throw new RequestedResourceNotFoundError()
            }
            res.sendStatus(204)
        } catch (err) {
            next(err)
        }
    }
}

const productHivesController = new ProductHivesController()

export default productHivesController