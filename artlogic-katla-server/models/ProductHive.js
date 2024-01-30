import { DataTypes } from "sequelize";

//id, updatedAt and createdAt will be created by sequelize 
function DefineProductHive(sequelize)
{
    sequelize.define('Hive', {
        name: {
            type: DataTypes.TEXT(60),
            allowNull: false
        },
        code: {
            type: DataTypes.TEXT(5),
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.TEXT(300),
            allowNull: false
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

export default DefineProductHive