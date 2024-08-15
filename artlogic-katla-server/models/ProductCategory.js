import { DataTypes } from "sequelize";

//id, updatedAt and createdAt will be created by sequelize 
function DefineProductCategory(sequelize)
{
    sequelize.define('ProductCategory', {
        name: {
            type: DataTypes.TEXT(60),
            allowNull: false
        },
        code: {
            type: DataTypes.TEXT(5),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT(300)
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
}

export default DefineProductCategory