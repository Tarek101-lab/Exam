import express from "express"
import {auth} from "../middleware/auth.js"
import { listExpenses, getExpense, createExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js"
const router = express.Router()

//router.post("/", )
router.get("/", auth, listExpenses)
router.get("/:id", auth, getExpense)
router.post("/", auth, createExpense)
router.put("/:id", auth, updateExpense)
router.delete("/:id", auth, deleteExpense)

export default router;