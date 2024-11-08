import { Router } from "express";
import { placeOrder } from "../Controllers/orderController";

const router = Router()

router.post('/', placeOrder)

export default router
