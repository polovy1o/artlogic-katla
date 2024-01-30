import sequelize from '../database.js'

class ProductHiveSectionsService {
    getHiveSections() {
        return sequelize.models.HiveSection.findAll({
            attributes: [ 'id', 'name', 'code', 'isDeleted' ]
        })
    }

    getHiveSection(id) {
        return sequelize.models.HiveSection.findByPk(id, {
            attributes: [ 'id', 'name', 'code', 'isDeleted', 'updatedAt' ]
        })
    }

    setHiveSectionStatus(id, isDeleted) {
        return sequelize.models.HiveSection.update({ isDeleted }, { where: { id }})
    }
}

const productHiveSectionsService = new ProductHiveSectionsService()

export default productHiveSectionsService