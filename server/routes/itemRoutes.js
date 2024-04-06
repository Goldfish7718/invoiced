import { Router } from "express";
import { getItems, postItem } from "../controllers/itemControllers.js";

const router = Router()

router.get('/', getItems)
router.post('/new', postItem)

export default router