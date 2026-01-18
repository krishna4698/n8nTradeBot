import { UserModel } from "db"
import mongoose from "mongoose"
import express from "express"
import { SignupSchema } from "common"

mongoose.connect(process.env.MONGO_URL as string)

const app = express()
app.use(express.json())

app.post("/signup", async (req, res) => {

    const { success, data } = SignupSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Incorrect inputs"
        })
        return
    }
    try {
        const user  = await UserModel.create({
            username: data.username,
            password: data.password
        })
        res.json({
            id: user._id
        })
    } catch (error) {
        res.status(411).json({
            message: "username is already exists"
        })
    }
})