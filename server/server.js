
const account = require('./account');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get('/hello',(req, res) =>
    res.send('hello world'));

app.post('/login', account.login)

app.post('/signup', account.signup)

app.listen(3000);