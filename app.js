import express from 'express'
import connectDB from './db/connectDB'

const app = express()
const port = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

connectDB(DATABASE_URL);

app.listen(port, () => {
    console.log(`sever is listening at http://localhost:${port}`);
})