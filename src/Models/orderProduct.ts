import { DataTypes, Model } from "sequelize";
import { sequelize } from "../Utils/database";


export class OrderProduct extends Model { }

OrderProduct.init(
    {
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        sequelize,
        tableName: 'OrderdProducts'
    }
)

async function tableSync() {
    try {
        await OrderProduct.sync({ alter: true })
        console.log('table sync success')

    } catch (err) {
        console.log('syncing database tables failed', err)
    }
}

tableSync()
