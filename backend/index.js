import "dotenv/config"
import express from "express"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
import resumeRoutes from './routes/resumeRoutes.js'

import compression from "compression"
import { rateLimit } from "express-rate-limit"

let port = process.env.PORT || 10000
let app = express()

app.use(compression())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-7', 
    legacyHeaders: false, 
    message: "Too many requests from this IP, please try again after 15 minutes"
})

app.use(limiter)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)
app.use('/api/resume', resumeRoutes)

app.get("/" , (req,res)=>{
    res.send("Hello From Server")
})

app.listen(port , ()=>{
    console.log("Server Started")
    connectDb()
})