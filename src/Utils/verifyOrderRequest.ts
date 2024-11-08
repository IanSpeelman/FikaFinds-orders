import { warn } from "console";
import { orderRequest } from "./types";

export default function verifyOrderRequest(req: orderRequest) {

    const arr = req.products.map(product => {
        return (
            typeof product.amount === "number" &&
            typeof product.product.id === "number" &&
            typeof product.product.name === "string" &&
            typeof product.product.image === "string" &&
            typeof product.product.price === "number" &&
            typeof product.product.category === "string" &&
            typeof product.product.description === "string" &&
            typeof product.product.specifications === "string"
        )
    })

    return typeof req.user === "number" && !arr.includes(false)

}
