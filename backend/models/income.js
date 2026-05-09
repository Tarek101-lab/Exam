import mongoose from "mongoose"
const incomeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})
const Income = mongoose.model("Income", incomeSchema);
export default Income;