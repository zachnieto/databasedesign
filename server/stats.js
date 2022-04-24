import connection from "./server.js";

const getHeroStats = async (req, res) => {
    const username = req.params.username


    connection.query(`CALL getUserStats(?)`,
        [username],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
        })

    res.sendStatus(200);
};

const getHeroes = async (req, res) => {

    connection.query(`CALL getAllHeros()`,
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.json(rows[0])
        })
};

const getChamps = async (req, res) => {

    connection.query(`CALL getAllChamps()`,
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.json(rows[0])
        })
};

const getChampStats = async (req, res) => {
    const champName = req.params.champName

    connection.query(`CALL getChampStats(?)`, [champName],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.json(rows[0][0])
        })
};

const getUserChampStats = async (req, res) => {
    const userName = req.params.userName
    const champName = req.params.champName

    connection.query(`CALL getUserChampStats(?, ?)`, [userName, champName],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.json(rows[0][0])
        })
};

const getUserHeroStats = async (req, res) => {
    const userName = req.params.userName
    const heroName = req.params.heroName

    connection.query(`CALL getUserHeroStats(?, ?)`, [userName, heroName],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.json(rows[0][0])
        })
};

const getLolMatches = async (req, res) => {
    const userName = req.params.userName

    connection.query(`CALL getLolMatches(?)`, [userName],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.json(rows[0])
        })
};

const getOwMatches = async (req, res) => {
    const userName = req.params.userName

    connection.query(`CALL getOwMatches(?)`, [userName],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.json(rows[0])
        })
};

const deleteOwMatch = async (req, res) => {
    const matchId = req.params.matchId

    connection.query(`CALL delete_owmatch(?)`, [matchId],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.sendStatus(200)
        })
};

const deleteLolMatch = async (req, res) => {
    const matchId = req.params.matchId

    connection.query(`CALL delete_lolmatch(?)`, [matchId],
        (err, rows) => {
            if (err) throw err
            console.log(rows)
            res.sendStatus(200)
        })
};

const addOwMatch = async (req, res) => {
    const hero = req.body.params.hero
    const lasthits = req.body.params.lasthits
    const deaths = req.body.params.deaths
    const elims = req.body.params.elims
    const type = req.body.params.type
    const medals = req.body.params.medals
    const result = req.body.params.result

    connection.query(`CALL add_owmatch(?,?,?,?,?,?,?,?)`,
        [req.session.user.userName, hero, lasthits, deaths, elims, type, medals, result],
        (err, rows) => {
            if (err) return res.status(400).send("Invalid Hero Name or Match Data")
            console.log(rows)
            res.sendStatus(200)
        })
};

const addLolMatch = async (req, res) => {
    const champ = req.body.params.champion
    const kills = req.body.params.kills
    const deaths = req.body.params.deaths
    const assists = req.body.params.assists
    const tows = req.body.params.tows
    const lane = req.body.params.lane
    const result = req.body.params.result

    connection.query(`CALL add_lolmatch(?,?,?,?,?,?,?,?)`,
        [req.session.user.userName, champ, kills, deaths, assists, tows, result, lane],
        (err, rows) => {
            if (err) return res.status(400).send("Invalid Hero Name or Match Data")
            console.log(rows)
            res.sendStatus(200)
        })
};


export default (app) => {
    app.get('/herostats/:username', getHeroStats)
    app.get('/heroes', getHeroes)
    app.get('/champs', getChamps)
    app.get('/champstats/:champName', getChampStats)
    app.get('/userchampstats/:userName/:champName', getUserChampStats)
    app.get('/userherostats/:userName/:heroName', getUserHeroStats)
    app.get('/owmatches/:userName', getOwMatches)
    app.get('/lolmatches/:userName', getLolMatches)
    app.delete('/owmatches/:matchId', deleteOwMatch)
    app.delete('/lolmatches/:matchId', deleteLolMatch)
    app.post('/owmatches', addOwMatch)
    app.post('/lolmatches', addLolMatch)
};