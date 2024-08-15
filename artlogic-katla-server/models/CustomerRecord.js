import { DataTypes } from "sequelize";

function DefineCustomerRecord(sequelize) {
    sequelize.define('CustomerRecord', {
        name: {
            type: DataTypes.TEXT(60),
            defaultValue: null
        },
        address: {
            type: DataTypes.TEXT(60),
            defaultValue: null
        },
        phone: {
            type: DataTypes.TEXT(20),
            defaultValue: null
        },
    })
}

export default DefineCustomerRecord