const sha256 = require('js-sha256');

const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'final'
})
connection.connect()

const login = (req, res) => {
    console.log(req.body)

    username = req.body.username
    password_hash = sha256(req.body.password)

    connection.query('SELECT * FROM user WHERE user.username = ? AND user.password_hash = ?',
        [username, password_hash],
        (err, rows, fields) => {
            if (err) throw err
            if (rows.length !== 0) {
                res.send("Logging in")
                console.log("Logging in")
            } else {
                res.send("Incorrect login")
                console.log("Incorrect login")
            }
        })
}

const signup = (req, res) => {
    console.log(req.body)

    username = req.body.username
    password_hash = sha256(req.body.password)

    connection.query(`SELECT * FROM user WHERE username = username`,
        [username, password_hash],
        (err, rows, fields) => {
            if (err) throw err
            if (rows.length !== 0) {
                res.send("Account already exists")
                console.log("Account already exists")
            }
            else
                connection.query(`INSERT INTO user (username, password_hash) VALUES (?, ?)`, [username, password_hash],
                    (err, rows, fields) => {
                        if (err) throw err
                        res.send("Account created")
                        console.log("Account created")
                    })
        })
}

module.exports = {
    signup,
    login,
}