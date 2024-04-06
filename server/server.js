import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

config()

import itemRoutes from './routes/itemRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express()

if (process.env.ORIGIN) {
    app.use(cors({
        credentials: true,
        origin: process.env.ORIGIN
    }))
} else {
    app.use(cors())
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/orders', orderRoutes)
app.use('/items', itemRoutes)

const connectDB = async url => {
    await mongoose
        .connect(url)
        .then(() => console.log("Database Connected"))
        .catch(err => console.log(err))
}

app.listen(5000, async () => {
    await connectDB(process.env.DB_URI || 'mongodb://0.0.0.0:27017/invoiced')
    console.log("Server started on port 5000");    
})