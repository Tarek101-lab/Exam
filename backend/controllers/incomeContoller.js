import mongoose from "mongoose";
import Income from "../models/income.js";

export async function listIncomes(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });

    const income = await Income.find({ owner: userId }).sort({
      createdAt: -1,
    });
    res.json({ income });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch income" });
  }
}

export async function getIncome(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });
    const income = await Income.findOne({
      _id: req.params.id,
      owner: userId,
    });
    res.json({income});
    if (!income) return res.status(404).json({ error: "Income not found" });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch income" });
  }
}

export async function createIncome(req,res){
  try {
    const userId = req.user?.id;
    if(!userId) return res.status(401).json({error: "Invalid token/user"})

      const {name, amount} = req.body;

      if(!name || !amount) return res.status(400).json({error: "name and amount is required"})
      
      const income = new Income({
        name, 
        amount,
        owner: new mongoose.Types.ObjectId(userId)
        // converts string => MongoDb objectId
      })

      const error = income.validateSync();
      if(error){
        console.log(error)
        return res.status(400).json({error: "Failed to validate income."})
      }

      await income.save();
      res.json(income)

    
  } catch (error) {
    console.log(error);
    res.status(400).json({error: "Failed to create income"})
  }
}

export async function updateIncome(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { name, amount } = req.body;

    const income = await Income.findOneAndUpdate(
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
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.status(200).json(income);

  } catch (error) {
    res.status(400).json({ error: "Failed to update income" });
  }
}

export async function deleteIncome(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });

    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      owner: userId,
    });
    if (!income) return res.status(404).json({ error: "Income not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch income" });
  }
}
