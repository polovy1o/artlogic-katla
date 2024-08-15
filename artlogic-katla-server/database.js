import { Sequelize } from "sequelize";
import path from 'path'
import { fileURLToPath } from 'url'
import DefineProductCategory from "./models/ProductCategory.js";
import DefineCatalogueProduct from "./models/CatalogueProduct.js";
import DefineProductHive from "./models/ProductHive.js";
import DefineProductHiveSection from "./models/ProductHiveSection.js";
import DefineProductStoreItem from "./models/ProductStoreItem.js";
import DefineCustomerRecord from "./models/CustomerRecord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = __dirname + '\\KatlaDB.sqlite';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
    logging: false
})

DefineCustomerRecord(sequelize)
DefineProductCategory(sequelize)
DefineCatalogueProduct(sequelize)
DefineProductHive(sequelize)
DefineProductHiveSection(sequelize)
DefineProductStoreItem(sequelize)

export async function connectDatabase() {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    await sequelize.authenticate();
    await sequelize.sync({ force: isDevelopment, alter: isDevelopment })

    console.log('\n\n\nConnection to database has been established successfully.');

    if (isDevelopment) {
        await createRecordsForDevelopment()
        console.warn('  WARNING! Database in development mode\n')
    }
}


async function createRecordsForDevelopment() {

    sequelize.query("INSERT INTO ProductCategories VALUES (1, 'Running shoes', 'RUNSH', 'test', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:02:08')")
    sequelize.query("INSERT INTO ProductCategories VALUES (2, 'Running clothing', 'RUNCL', 'test', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33')")
    sequelize.query("INSERT INTO ProductCategories VALUES (3, 'Bicycling', 'BICYC', 'test', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33')")

    sequelize.query("INSERT INTO CatalogueProducts VALUES (1, 'Kyak Men Shoes', 'KYME1', '8372411146', 10, 'desc', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 1)")
    sequelize.query("INSERT INTO CatalogueProducts VALUES (2, 'Top-top Men Shoes', 'TTME1', '8372411146', 10, 'desc', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 1)")
    sequelize.query("INSERT INTO CatalogueProducts VALUES (3, 'Abibas T-Shirt', 'ABIT1', '8372411146', 10, 'desc', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 2)")
    sequelize.query("INSERT INTO CatalogueProducts VALUES (4, 'Pedali 360 Bicycle', 'PBYC1', '8372411146', 10, 'desc', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 3)")

    sequelize.query("INSERT INTO Hives VALUES (1, 'Main', 'HIVE1', 'Lviv, Chornovola-30', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33')")
    sequelize.query("INSERT INTO Hives VALUES (2, 'Second', 'HIVE2', 'Lviv, Lichakivska-47', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33')")

    sequelize.query("INSERT INTO HiveSections VALUES (1, 'MSQ #1', 'HSE11', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 1)")
    sequelize.query("INSERT INTO HiveSections VALUES (2, 'MSQ #2', 'HSE12', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 1)")
    sequelize.query("INSERT INTO HiveSections VALUES (3, 'MSQ #3', 'HSE21', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 2)")
    sequelize.query("INSERT INTO HiveSections VALUES (4, 'MSQ #4', 'HSE22', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 2)")
    sequelize.query("INSERT INTO HiveSections VALUES (5, 'BBR #1', 'HSE31', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 1)")
    sequelize.query("INSERT INTO HiveSections VALUES (6, 'BBR #2', 'HSE32', 0, 1, 1, '2024-01-26 15:01:35', '2024-01-26 15:01:33', 2)")

    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 1, 1)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 1, 2)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 2, 3)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 3, 1)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 3, 2)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 4, 3)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 5, 1)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 5, 2)")
    sequelize.query("INSERT INTO ProductSectionCategories VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 6, 3)")

    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 1, 1, 1, 10)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 2, 1, 3, 1)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 3, 1, 5, 0)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 4, 2, 1, 5)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 5, 2, 3, 100)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 6, 2, 5, 10)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 7, 3, 1, 10)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 8, 3, 3, 10)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 9, 3, 5, 10)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 10, 4, 2, 4)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 11, 4, 4, 0)")
    sequelize.query("INSERT INTO ProductStoreItems (createdAt, updatedAt, id, productId, sectionId, quantity) VALUES ('2024-01-26 15:01:33', '2024-01-26 15:01:33', 12, 4, 6, 0)")

    sequelize.query("INSERT INTO CustomerRecords VALUES (1, 'Petro Herachenko', 'Lviv', '+38091938291', '2024-01-26 15:01:33', '2024-01-26 15:01:33')")
    sequelize.query("INSERT INTO CustomerRecords VALUES (2, 'Ivan Malosh', 'Lviv', '+380717193718', '2024-01-26 15:01:33', '2024-01-26 15:01:33')")
}

export default sequelize;