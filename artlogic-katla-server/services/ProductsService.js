import sequelize from '../database.js'

class ProductsService {
    async getProducts() {
        const products = await sequelize.models.CatalogueProduct.findAll({
            attributes: [
                'id', 'name', 'categoryId', 'code', 'isDeleted', 'updatedAt'
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

    createProduct({name, code, categoryId}) {
        return sequelize.models.CatalogueProduct.create({name, code, categoryId})
    }

    deleteProduct(id) {
        return sequelize.models.CatalogueProduct.destroy({
            where: { id }
        })
    }

    //
    //TODO
    //
    async getProduct(id) {
        let product = await sequelize.models.CatalogueProduct.findByPk(id, {
            attributes: [
                'id', 'name', 'categoryId', 'code', 'isDeleted', 'updatedAt'
            ]
        })

        if (!product) return null;

        product = {...product.dataValues};
        product.manufacturerCode = '';
        product.description = ''
        product.price = 0;

        return product;
    }

    updateProduct(id, { name, code, categoryId }) {
        return sequelize.models.CatalogueProduct.update({ name, categoryCode: code, categoryId}, {
            where: { id }
        })
    }

    setProductStatus(id, isDeleted) {
        return sequelize.models.CatalogueProduct.update({ isDeleted }, { where: { id } })
    }
}

const productsService = new ProductsService()

export default productsService