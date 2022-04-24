import express from 'express';
import session from 'express-session';
import cors from 'cors';
import account from "./account.js";
import env from 'custom-env';
const app = express();

env.env('dev');
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

if (process.env.APP_ENV === 'dev') {
    sess.cookie.secure = false;
} else {
    sess.cookie.sameSite = 'none';
}

app.set('trust proxy', 1);
app.use(session(sess));

account(app);

app.listen(process.env.PORT || 4000);