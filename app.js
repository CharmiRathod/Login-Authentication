import express from 'express'
import connectDB from  './db/connectDB.js'
import web from './Routes/web.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL);

app.use("/user", web);

app.listen(port, () => {
    console.log(`sever is listening at http://localhost:${port}`);
})