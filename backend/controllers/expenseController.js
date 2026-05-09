import mongoose from "mongoose";
import Expense from "../models/expense.js";

export async function listExpenses(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });

    const expenses = await Expense.find({ owner: userId }).sort({ createdAt: -1 });
    res.json({ expenses });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch expense" });
  }
}

export async function getExpense(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });
    const expense = await Expense.findOne({
      _id: req.params._id,
      owner: userId,
    });

    if (!expense) return res.status(404).json({ error: "expense not found" });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch expense" });
  }
}

export async function createExpense(req,res){
  try {
    const userId = req.user?.id;
    if(!userId) return res.status(401).json({error: "Invalid token/user"})

      const {name, amount} = req.body;

      if(!name || !amount) return res.status(400).json({error: "name and amount is required"})
      
      const expense = new Expense({
        name, 
        amount,
        owner: new mongoose.Types.ObjectId(userId)
        // converts string => MongoDb objectId
      })

      const error = expense.validateSync();
      if(error){
        console.log(error)
        return res.status(400).json({error: "Failed to validate expense."})
      }

      await expense.save();
      res.json(expense)

    
  } catch (error) {
    console.log(error);
    res.status(400).json({error: "Failed to create goal"})
  }
}
export async function updateExpense(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { name, amount } = req.body;

    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: userId,
      },
      {
        name,
        amount,
      },
      { new: true }
    );
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json(expense);

  } catch (error) {
    res.status(400).json({ error: "Failed to update expense" });
  }
}

export async function deleteExpense(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });

    const expense = await Expense.findOneAndDelete({
        _id:req.params.id,
        owner:userId
    })
    if (!expense) return res.status(404).json({ error: "Expnese not found" });
    res.status(200).json({message:"Deleted successfully"})
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch expense" });
  }
}

