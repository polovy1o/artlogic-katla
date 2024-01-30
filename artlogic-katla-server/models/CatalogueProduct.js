import { DataTypes } from "sequelize";

function DefineCatalogueProduct(sequelize) {
    const CatalogueProduct = sequelize.define('CatalogueProduct', {
        name: {
            type: DataTypes.TEXT(60),
            allowNull: false
        },
        code: {
            type: DataTypes.TEXT(5),
            allowNull: false
        },
        manufacturerCode: {
            type: DataTypes.TEXT(10),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT(300),
            defaultValue: null
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: DataTypes.INTEGER
        },
        updatedBy: {
            type: DataTypes.INTEGER
        }
    })
    
    CatalogueProduct.belongsTo(sequelize.models.ProductCategory, { as: 'category', onDelete: 'CASCADE'})
}

export default DefineCatalogueProduct