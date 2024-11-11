import { Request, Response } from "express";
import { Order } from "../Models/orderModel";
import { OrderProduct } from "../Models/orderProduct";
import { orderProductRequest } from '../Utils/types'
import verifyOrderRequest from "../Utils/verifyOrderRequest";

export async function placeOrder(req: Request, res: Response) {
    if (verifyOrderRequest(req.body)) {
        try {

            const order = Order.build({
                user: req.body.user
            })
            await order.save()

            const orderNumber = order.dataValues.id
            const productList = req.body.products.map((product: orderProductRequest) => {
                return {
                    OrderId: orderNumber,
                    product: product.product.id,
                    amount: product.amount,
                    price: product.product.price
                }
            })
            await OrderProduct.bulkCreate(productList)

            res.status(201).end()

        } catch (err) {
            res.status(500).send({ err: err })
        }
    }
    res.status(406).end();
}

export async function getByUserId(req: Request, res: Response) {
    const { id } = req.params
    const orders = await Order.findAll({ include: [{ model: OrderProduct }], where: { user: id } })
    res.send(orders)
}
