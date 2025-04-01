import { Router } from "express";
import AuthRouter from "./Auth.router"
import ClothesRouter from "./Clothes.router"

const router = Router()
router.use("/auth", AuthRouter);
router.use("/clothes", ClothesRouter);

export default router;