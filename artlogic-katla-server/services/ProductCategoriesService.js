import sequelize from '../database.js'

class ProductCategoriesService {
    async getCategories() {
        const categories = await sequelize.models.ProductCategory.findAll({
            attributes: [
                'id', 'name', 'code', 'isDeleted', 'updatedAt'
            ]
        });

        for (let i = 0; i < categories.length; ++i)
        {
            const productCount = await sequelize.models.CatalogueProduct.count({ where: { categoryId: categories[i].id }})
            categories[i] = {...categories[i].dataValues, productCount}
        }

        return categories
    }

    createCategory({ name, code, description }) {
        return sequelize.models.ProductCategory.create({name, code, description})
    }

    deleteCategory(id) {
        return sequelize.models.ProductCategory.destroy({ where: { id }})
    }

    getCategory(id) {
        return sequelize.models.ProductCategory.findByPk(id, {attributes: [
            'id', 'name', 'code', 'description', 'isDeleted', 'updatedAt'
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
            attributes: [ 'id', 'name', 'code', 'description', 'isDeleted', 'updatedAt' ]
        })
    }
}

const productCategoriesService = new ProductCategoriesService()

export default productCategoriesService