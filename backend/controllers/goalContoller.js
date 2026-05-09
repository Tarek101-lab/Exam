import mongoose from "mongoose";
import Goal from "../models/goal.js";

export async function listGoals(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });

    const goals = await Gaol.find({ owner: userId }).sort({ createdAt: -1 });
    res.json({ goals });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch goals" });
  }
}

export async function getGoal(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });
    const goals = await Goal.findOne({
      _id: req.params._id,
      owner: userId,
    });

    if (!goals) return res.status(404).json({ error: "goals not found" });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch goals" });
  }
}

export async function createGoal(req,res){
  try {
    const userId = req.user?.id;
    if(!userId) return res.status(401).json({error: "Invalid token/user"})

      const {name, amount} = req.body;

      if(!name || !amount) return res.status(400).json({error: "name and amount is required"})
      
      const goal = new Goal({
        name, 
        amount,
        owner: new mongoose.Types.ObjectId(userId)
        // converts string => MongoDb objectId
      })

      const error = goal.validateSync();
      if(error){
        console.log(error)
        return res.status(400).json({error: "Failed to validate goal."})
      }

      await goal.save();
      res.json(goal)

    
  } catch (error) {
    console.log(error);
    res.status(400).json({error: "Failed to create goal"})
  }
}

export async function updateGoal(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { name, amount } = req.body;

    const goal = await Goal.findOneAndUpdate(
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
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(goal);

  } catch (error) {
    res.status(400).json({ error: "Failed to update Goal" });
  }
}

export async function deleteGoal(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).json({ error: "Invalid token" });

    const goal = await Goal.findOneAndDelete({
        _id:req.params.id,
        owner:userId
    })
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.status(200).json({message:"Deleted successfully"})
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch goal" });
  }
}

