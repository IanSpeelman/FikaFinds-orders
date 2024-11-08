import { Request, Response } from "express";
import { Order } from "../Models/orderModel";
import { OrderProduct } from "../Models/orderProduct";
import { orderProductRequest } from '../Utils/types'
import verifyOrderRequest from "../Utils/verifyOrderRequest";

export async function placeOrder(req: Request, res: Response) {

    console.log(verifyOrderRequest(req.body))

    const order = Order.build({
        user: req.body.user
    })
    await order.save()

    const orderNumber = order.dataValues.id
    const productList = req.body.products.map((product: orderProductRequest) => {
        return {
            order: orderNumber,
            product: product.product.id,
            amount: product.amount
        }
    })
    await OrderProduct.bulkCreate(productList)

    res.send(req.body)
}
