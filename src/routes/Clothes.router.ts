import { Router } from "express";
import { create, list, update, remove } from "../controllers/Clothes.controller";
import { verifyToken } from "../middlewares/authenticateJWT";

const router = Router();

router.get("/", list);
router.post("/", verifyToken, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

export default router;