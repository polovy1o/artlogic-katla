import sequelize from '../database.js'

class ProductCategoriesService {
    getCategories() {
        return sequelize.models.ProductCategory.findAll({attributes: [
            'id', 'name', 'code', 'isDeleted', 'updatedAt'
        ]});
    }

    createCategory({ name, code, description }) {
        return sequelize.models.ProductCategory.create({name, code, description})
    }

    deleteCategory(id) {
        return sequelize.models.ProductCategory.destroy({ where: { id }})
    }

    //
    //TODO
    //
    getCategory(id) {
        return sequelize.models.ProductCategory.findByPk(id, {attributes: [
            'id', 'name', 'code', 'isDeleted', 'updatedAt'
        ]});
    }

    updateCategory(id, { name, code, description }) {
        return sequelize.models.ProductCategory.update({ name, code, description }, {
            where: { id }
        })
    }

    setCategoryStatus(id, isDeleted) {
        return sequelize.models.ProductCategory.update({ isDeleted }, { where: { id } })
    }

    getCategoryProducts(categoryId) {
        return sequelize.models.CatalogueProduct.findAll({ 
            where: { categoryId },
            attributes: [ 'id', 'name', 'code', 'isDeleted', 'updatedAt' ]
        })
    }
}

const productCategoriesService = new ProductCategoriesService()

export default productCategoriesService