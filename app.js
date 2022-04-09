import express from 'express'
import connectDB from  './db/connectDB.js'
import web from './Routes/web.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL);

const sessionStorage = MongoStore.create({
    mongoUrl: DATABASE_URL,
    dbName: 'Logindb',
    collectionName: 'sessions',
    autoRemove: 'native'
})

app.use("/user", web);

app.use(express.json())

app.use(session({
    name: 'firstSession',
    secret: 'iamkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000,
        sameSite: false
    },
    store: sessionStorage
}));

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`sever is listening at http://localhost:${port}`);
})