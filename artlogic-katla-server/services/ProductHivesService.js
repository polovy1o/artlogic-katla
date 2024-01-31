import sequelize from '../database.js'

class ProductHivesService {
    async getHives() {
        const hives = await sequelize.models.Hive.findAll({
            attributes: [ 'id', 'name', 'code', 'isDeleted' ]
        })
        const newHives = [];

        for (let hive of hives)
        {
            const hiveSectionCount = (await sequelize.models.HiveSection.count({
                where: { hiveId: hive.id }
            }))
            newHives.push({
                ...hive.dataValues,
                hiveSectionCount
            })
        }

        return newHives;
    }

    getHive(id) {
        return sequelize.models.Hive.findByPk(id, {
            attributes: [ 'id', 'name', 'code', 'address', 'isDeleted', 'updatedAt' ]
        })
    }

    getHiveSections(hiveId) {
        return sequelize.models.HiveSection.findAll({
            where: { hiveId },
            attributes: [ 'id', 'name', 'code', 'isDeleted' ]
        })
    }

    createHive({ name, code, address }) {
        return sequelize.models.Hive.create({name, code, address})
    }

    deleteHive(id) {
        return sequelize.models.Hive.destroy({ where: { id }})
    }

    updateHive(id, { name, code, address }) {
        return sequelize.models.Hive.update({ name, code, address }, {
            where: { id }
        })
    }

    setHiveStatus(id, isDeleted) {
        return sequelize.models.Hive.update({ isDeleted }, { where: { id } })
    }
}

const productHivesService = new ProductHivesService()

export default productHivesService