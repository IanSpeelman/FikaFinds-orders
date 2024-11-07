import { Sequelize } from "sequelize";
const host = process.env.ORDERSHOST || ""
const pass = process.env.DBPASS || ""
const user = process.env.DBUSER || ""
const database = process.env.DBORDERS || ""

export const sequelize = new Sequelize(database, user, pass, {
    host: host,
    dialect: "postgres"
})

async function checkConnection() {
    try {
        await sequelize.authenticate()
        console.log('database connection success')

    } catch (err) {
        console.log('database connection failed', err)
    }
}
checkConnection()
