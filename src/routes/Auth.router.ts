import express from "express";
import { getUsers, login, register, remove } from "../controllers/Auth.controller";

const router = express.Router();

router.get("/list", getUsers); 
router.post("/register", register); 
router.post("/login", login); 
router.delete("/delete/:id", remove); 

export default router;
