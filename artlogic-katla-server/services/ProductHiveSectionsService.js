import sequelize from '../database.js'

class ProductHiveSectionsService {
    getHiveSections() {
        return sequelize.models.HiveSection.findAll({
            attributes: [ 'id', 'name', 'hiveId', 'code', 'isDeleted' ]
        })
    }

    getHiveSection(id) {
        return sequelize.models.HiveSection.findByPk(id, {
            attributes: [ 'id', 'name', 'code', 'hiveId', 'isDeleted', 'updatedAt' ]
        })
    }

    createHiveSection({ name, code, hiveId }) {
        return sequelize.models.HiveSection.create({name, code, hiveId})
    }

    deleteHiveSection(id) {
        return sequelize.models.HiveSection.destroy({ where: { id }})
    }

    updateHiveSection(id, { name, code }) {
        return sequelize.models.HiveSection.update({ name, code }, {
            where: { id }
        })
    }

    setHiveSectionStatus(id, isDeleted) {
        return sequelize.models.HiveSection.update({ isDeleted }, { where: { id }})
    }
}

const productHiveSectionsService = new ProductHiveSectionsService()

export default productHiveSectionsService