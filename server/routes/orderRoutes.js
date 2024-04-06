import { Router } from "express";
import { getOrders, postOrder } from "../controllers/orderControllers.js";

const router = Router()

router.get('/', getOrders)
router.post('/new', postOrder)

export default router