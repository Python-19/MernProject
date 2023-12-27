import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'

import UserRoute from './routes/UserRoutes.js'
const app = express()
const port = process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL
app.use(cors())

connectDB(DATABASE_URL)
//JSON
app.use(express.json())
//Loades Routes
app.use('/api/user',UserRoute)
app.listen(port,()=>{
  console.log("server is listening on port 8000")
})