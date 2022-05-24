import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import { setUser } from './middleware/setUser'
app.use(express.json())
app.use('*', setUser)

import { connectDb } from './db/connect'
connectDb()

const PORT = process.env.PORT

import api from './routes/api'
app.use('/api', api)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
