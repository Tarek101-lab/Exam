import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import UsersRoutes from './routes/usersRoutes.js'
import incomeRoutes from './routes/incomeRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import goalRoutes from './routes/goalRoutes.js'

dotenv.config();
const app = express();
app.use(express.json()) 
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
        console.log("Server is running on PORT: " + PORT)
    })
}).catch((err) => {
    console.log(err)
    console.log("failed to connect to mongo db")
})


app.use("/auth", UsersRoutes);

app.use("/incomes", incomeRoutes);

app.use("/expenses", expenseRoutes);

app.use("/goals", goalRoutes);