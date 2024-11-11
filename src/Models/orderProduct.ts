import { DataTypes, Model } from "sequelize";
import { sequelize } from "../Utils/database";
import { Order } from "./orderModel";


export class OrderProduct extends Model { }

OrderProduct.init(
    {
        // order: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'OrderdProducts'
    }
)
Order.hasMany(OrderProduct)

async function tableSync() {
    try {
        await OrderProduct.sync({ alter: true })
        console.log('table sync success')

    } catch (err) {
        console.log('syncing database tables failed', err)
    }
}

tableSync()
