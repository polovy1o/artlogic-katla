import { DataTypes } from "sequelize";

//id, updatedAt and createdAt will be created by sequelize 
function DefineProductStoreItem(sequelize)
{
    const ProductStoreItem = sequelize.define('ProductStoreItem', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    ProductStoreItem.belongsTo(sequelize.models.CatalogueProduct, { as: 'product', onDelete: 'CASCADE'})
    ProductStoreItem.belongsTo(sequelize.models.HiveSection, { as: 'section', onDelete: 'CASCADE'})
}

export default DefineProductStoreItem