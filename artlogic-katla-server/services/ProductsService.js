import sequelize from '../database.js'

class ProductsService {
    async getProducts() {
        const products = await sequelize.models.CatalogueProduct.findAll({
            attributes: [
                'id', 'name', 'categoryId', 'code', 'manufacturerCode', 'price', 'description', 'isDeleted', 'updatedAt'
            ]
        })

        for (let i = 0; i < products.length; ++i)
        {
            const categoryCode = (await sequelize.models.ProductCategory.findByPk(
                products[i].categoryId, 
                {
                    attributes: ['code']
                }
            )).code
            products[i] = {...products[i].dataValues, categoryCode }
        }

        return products;
    }

    createProduct({name, code, manufacturerCode, price, description, categoryId}) {
        return sequelize.models.CatalogueProduct.create({name, code, manufacturerCode, price, description, categoryId})
    }

    deleteProduct(id) {
        return sequelize.models.CatalogueProduct.destroy({
            where: { id }
        })
    }

    getProduct(id) {
        return sequelize.models.CatalogueProduct.findByPk(id, {
            attributes: [
                'id', 'name', 'categoryId', 'code', 'manufacturerCode', 'price', 'description', 'isDeleted', 'updatedAt'
            ]
        })
    }

    updateProduct(id, { name, code, manufacturerCode, price, description, categoryId }) {
        return sequelize.models.CatalogueProduct.update(
            { 
                name, categoryCode: code, manufacturerCode, price, description, categoryId
            }, 
            {
                where: { id }
            }
        )
    }

    setProductStatus(id, isDeleted) {
        return sequelize.models.CatalogueProduct.update({ isDeleted }, { where: { id } })
    }
}

const productsService = new ProductsService()

export default productsService