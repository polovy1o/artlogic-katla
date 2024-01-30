import { DataTypes } from "sequelize";

//id, updatedAt and createdAt will be created by sequelize 
function DefineProductHiveSection(sequelize)
{
    const ProductHiveSection = sequelize.define('HiveSection', {
        name: {
            type: DataTypes.TEXT(60),
            allowNull: false
        },
        code: {
            type: DataTypes.TEXT(5),
            allowNull: false,
            unique: true
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
    
    ProductHiveSection.belongsTo(sequelize.models.Hive, { as: 'hive', onDelete: 'CASCADE'})
    ProductHiveSection.belongsToMany(sequelize.models.ProductCategory, { onDelete: 'CASCADE', through: 'ProductSectionCategories' })    
}

export default DefineProductHiveSection