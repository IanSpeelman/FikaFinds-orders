import { Router } from "express";
import { placeOrder, getByUserId } from "../Controllers/orderController";

const router = Router()

router.post('/', placeOrder)
router.get('/user/:id', getByUserId)

export default router
