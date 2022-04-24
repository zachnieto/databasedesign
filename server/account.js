import mysql from "mysql2";
import bcrypt from "bcrypt";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gameusers'
})
connection.connect()

const SALT_ROUNDS = 10

const login = async (req, res) => {
    const username = req.body.params.username
    const password = req.body.params.password

    connection.query('CALL getUsers(?)',
        [username],
        async (err, rows) => {
            if (err) throw err

            const result = rows[0]

            if (result.length !== 0 && await bcrypt.compare(password, result[0].pass)) {
                req.session.user = result[0]
                res.json(result[0])
                console.log(req.session)
            } else {
                res.status(403).send("Incorrect login")
                console.log("Incorrect login")
            }
        })
}

const createAccount = async (req, res) => {
    const username = req.body.params.username
    const password = req.body.params.password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)

    connection.query(`CALL getUsers(?)`,
        [username],
        (err, rows, fields) => {
            if (err) throw err
            const result = rows[0]
            console.log(result)
            if (result.length !== 0) {
                res.status(403).send("Account already exists")
                console.log("Account already exists")
            }
            else {
                connection.query(`CALL add_account(?, ?)`, [username, password_hash],
                    (err, rows, fields) => {
                        if (err) throw err
                        const user = {
                            userName: username
                        }
                        req.session.user = user
                        res.json(user)
                        console.log("Account created")
                    })
            }
        })
}

const getSession = (req, res) => {
    console.log("Fetching session")
    console.log(req.session)
    res.send(req.session);
}

const logout = async (req, res) => {
    console.log("Logging out")
    req.session.destroy();
    res.sendStatus(200);
};

const deleteAccount = async (req, res) => {
    const username = req.params.username
    if (username !== req.session.user.userName)
        return res.sendStatus(403)

    console.log("Deleting account")

    connection.query(`CALL delete_account(?)`,
        [username],
        (err, rows, fields) => {
            if (err) throw err
        })

    req.session.destroy();
    res.sendStatus(200);
};

const updateAccount = async (req, res) => {
    const password = req.body.params.password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)
    console.log("Updating password")
    console.log(req.session.user)
    connection.query(`CALL update_pass(?, ?)`,
        [req.session.user.userName, password_hash],
        (err, rows) => {
            if (err) throw err
        })

    res.sendStatus(200);
};

export default (app) => {
    app.post('/login', login)
    app.get('/logout', logout)
    app.get('/session', getSession)
    app.delete('/account/:username', deleteAccount)
    app.put('/account', updateAccount)
    app.post('/account', createAccount)
};