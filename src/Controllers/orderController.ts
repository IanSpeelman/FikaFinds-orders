import { Request, Response } from "express";
import { Order } from "../Models/orderModel";
import { OrderProduct } from "../Models/orderProduct";
import { orderProductRequest, jwtToken } from '../Utils/types'
import verifyOrderRequest from "../Utils/verifyOrderRequest";
import { jwtDecode } from "jwt-decode";

// todo require login
export async function placeOrder(req: Request, res: Response) {
    try {
        const token = req.get('Authorization') || ""
        const decoded: jwtToken = jwtDecode(token)
        if (!(decoded.exp > Math.floor(Date.now() / 1000))) {
            res.status(401).json({ err: "You need to be logged in to place an order" })
        }
    }
    catch (err) {
        res.status(401).json({ err: "You need to be logged in to place an order" })
        return
    }
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

// todo require login and match id
export async function getByUserId(req: Request, res: Response) {
    try {
        const token = req.get('Authorization') || ""
        const decoded: jwtToken = jwtDecode(token)
        if (!(decoded.exp > Math.floor(Date.now() / 1000))) {
            res.status(401).json({ err: "you need to be logged in to view orders" })
        }
    }
    catch (err) {
        res.status(401).json({ err: "you need to be logged in to view orders" })
        return
    }
    try {
        const { id } = req.params
        const orders = await Order.findAll({ include: [{ model: OrderProduct }], where: { user: id } })
        res.send(orders)

    } catch (err) {

        console.log(err)
        res.send(404).json({ err: 'no orders found for this user' })

    }
}
