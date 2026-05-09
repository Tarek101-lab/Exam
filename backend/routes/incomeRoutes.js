import express from "express"
import {auth} from "../middleware/auth.js"
import { listIncomes, getIncome, createIncome, updateIncome, deleteIncome } from "../controllers/incomeContoller.js"
const router = express.Router()

//router.post("/", )
router.get("/", auth, listIncomes)
router.get("/:id", auth, getIncome)
router.post("/", auth, createIncome)
router.put("/:id", auth, updateIncome)
router.delete("/:id", auth, deleteIncome)

export default router;