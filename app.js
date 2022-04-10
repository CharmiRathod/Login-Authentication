import express from 'express'
import connectDB from  './db/connectDB.js'
import bodyParser from "body-parser"
import web from './Routes/web.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const port = process.env.PORT
const DATABASE_URL = "mongodb://localhost:27017";
app.set("view engine", "ejs");
connectDB(DATABASE_URL);

// const sessionStorage = MongoStore.create({
//     mongoUrl: DATABASE_URL,
//     dbName: 'Logindb',
//     collectionName: 'sessions',
//     autoRemove: 'native'
// })


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.static("Frontend"));

app.use(session({
    name: 'firstSession',   
    secret: 'iamkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
        sameSite: false
    },
    // store: sessionStorage
}));

app.use(cookieParser());
app.use("/user", web);
app.listen(3000, () => {
    console.log(`sever is listening at http://localhost:5000`);
})