import express from 'express';
import session from 'express-session';
import cors from 'cors';
import account from "./account.js";
import env from 'custom-env';
import mysql from "mysql2";
import stats from "./stats.js";
const app = express();
env.env('dev');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connection.connect()



app.use(cors({
    credentials: true,
    origin: process.env.REACT_APP || "http://localhost:3000"
}));
app.use(express.json());

let sess = {
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
    }
};

if (process.env.APP_ENV !== 'dev') {
    sess.cookie.sameSite = 'none';
} else {
    sess.cookie.secure = false;
}

app.set('trust proxy', 1);
app.use(session(sess));

account(app);
stats(app);

app.listen(process.env.PORT || 4000);

export default connection;