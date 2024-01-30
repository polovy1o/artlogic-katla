import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerData from './swagger.json' assert {type: 'json'}
import productHivesRouter from './routers/ProductHivesRouter.js'
import productHiveSectionsRouter from './routers/ProductHiveSectionsRouter.js'
import productsRouter from './routers/ProductsRouter.js'
import productCategoriesRouter from './routers/ProductCategoriesRouter.js'
import sequelize, { connectDatabase } from './database.js'

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

app.use('/api/hives', productHivesRouter)
app.use('/api/sections', productHiveSectionsRouter)
app.use('/api/products', productsRouter)
app.use('/api/categories', productCategoriesRouter)

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerData)
);

startServer()

async function startServer() {
    try {
        app.listen(process.env.PORT || 3001, () => {
            connectDatabase().then(() => {
                console.log('Сервер був запущений на порту:', (process.env.PORT || 3001), '\n\n\n')
            }).catch((e) => {
                console.log(e, 'Помилка при створенні БД\n\n\n')
            })
        }).on('close', () => {
            sequelize.close()
        })
    } catch (e) {
        console.error('Помилка при запуску сервера', e.message)
    }
}