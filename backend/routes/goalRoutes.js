import express from "express"
import {auth} from "../middleware/auth.js"
import { listGoals, getGoal, createGoal, updateGoal, deleteGoal } from "../controllers/goalContoller.js"
const router = express.Router()

//router.post("/", )
router.get("/", auth, listGoals)
router.get("/:id", auth, getGoal)
router.post("/", auth, createGoal)
router.put("/:id", auth, updateGoal)
router.delete("/:id", auth, deleteGoal)

export default router;