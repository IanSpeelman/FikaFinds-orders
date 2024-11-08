import { DataTypes, Model } from "sequelize";
import { sequelize } from "../Utils/database";

export class Order extends Model { }

Order.init(
    {
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Order"
    }
)

async function tableSync() {
    try {
        await Order.sync({ alter: true })
        console.log('table sync success')

    } catch (err) {
        console.log('syncing database tables failed', err)
    }
}

tableSync()
