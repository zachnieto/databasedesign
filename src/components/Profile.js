import React, {useEffect, useRef, useState} from "react";
import api, {BACKEND_SERVER} from "../services/server-service";
import {useNavigate, Navigate} from "react-router-dom";

const Profile = ({session, setSession}) => {

    const navigate = useNavigate()
    const password = useRef()
    const [heroes, setHeroes] = useState([])
    const [champs, setChamps] = useState([])
    const [averageChampStats, setAverageChampStats] = useState({name: '', stats: {}})
    const [userChampStats, setUserChampStats] = useState({name: '', stats: {}})
    const [userHeroStats, setUserHeroStats] = useState({name: '', stats: {}})

    useEffect(() => {
        if (session.user) {
            const fetchData = async () => {
                let resp = await api.get(`${BACKEND_SERVER}/heroes`)
                setHeroes(resp.data)
                resp = await api.get(`${BACKEND_SERVER}/champs`)
                setChamps(resp.data)
            }
            fetchData()
        }
    }, [])

    const logOut = async () => {
        await api.get(`${BACKEND_SERVER}/logout`)
        navigate("/")
        setSession({})
    }

    const deleteAccount = async () => {
        await api.delete(`${BACKEND_SERVER}/account/${session.user.userName}`)
        navigate("/")
        setSession({})
    }

    const updateAccount = async () => {
        await api.put(`${BACKEND_SERVER}/account`, {
            params: {
                password: password.current.value,
            }
        })
    }

    const getHeroStats = async (heroName) => {
        let resp = await api.get(`${BACKEND_SERVER}/userherostats/${session.user.userName}/${heroName}`)
        setUserHeroStats({name: heroName, stats: resp.data})
    }

    const getChampStats = async (champName) => {
        let resp = await api.get(`${BACKEND_SERVER}/champstats/${champName}`)
        setAverageChampStats({name: champName, stats: resp.data})
        resp = await api.get(`${BACKEND_SERVER}/userchampstats/${session.user.userName}/${champName}`)
        setUserChampStats({name: champName, stats: resp.data})
    }

    if (!session.user)
        return <Navigate to="/"/>;

    return (
        <div>
            <h1>PROFILE</h1>
            <div className="row justify-content-center">
                <div className="col-3">
                    <h2>League Champions</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/matches/lol")}>Matches</button>
                    {champs.map(champ =>
                        <div className="hero m-1" onClick={() => getChampStats(champ.champion_name)}>
                            <span className="heroname fw-bold">{champ.champion_name}</span>
                            <span className="d-block">Lane: {champ.lane}</span>
                            <span className="d-block">Damage Type: {champ.damagetype}</span>
                            {userChampStats.name === champ.champion_name &&
                            <>
                                <span className="fw-bold">Your Stats</span>
                                <span className="d-block">Total Kills: {averageChampStats.stats.totkills}</span>
                                <span className="d-block">Total Deaths: {averageChampStats.stats.totdeaths}</span>
                                <span className="d-block">Total Assists: {averageChampStats.stats.totassists}</span>
                                <span className="d-block">Total Wins: {averageChampStats.stats.totwins}</span>
                                <span className="d-block">Total Losses: {averageChampStats.stats.totlosses}</span>
                            </>
                            }
                            {averageChampStats.name === champ.champion_name &&
                            <>
                                <span className="fw-bold">Total Stats</span>
                                <span className="d-block">Total Kills: {averageChampStats.stats.totkills}</span>
                                <span className="d-block">Total Deaths: {averageChampStats.stats.totdeaths}</span>
                                <span className="d-block">Total Assists: {averageChampStats.stats.totassists}</span>
                                <span className="d-block">Total Wins: {averageChampStats.stats.totwins}</span>
                                <span className="d-block">Total Losses: {averageChampStats.stats.totlosses}</span>
                            </>
                            }
                        </div>
                    )}
                </div>
                <div className="col-4">

                    <div className="row p-1">
                        <label className="col-3 col-form-label">Username:</label>
                        <div className="col-9">
                            <input readOnly className="col-9 form-control" placeholder={session.user.userName}/>
                        </div>
                    </div>

                    <div className="row p-1">
                        <label className="col-3 col-form-label">Password:</label>
                        <div className="col-9">
                            <input ref={password} className="col-9 form-control" type="password" placeholder="***"/>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-sm m-1" onClick={updateAccount}>Update Profile</button>
                    <button className="btn btn-danger btn-sm m-1" onClick={deleteAccount}>Delete Account</button>
                    <button className="btn btn-primary btn-sm m-1" onClick={logOut}>Logout</button>
                </div>
                <div className="col-3">
                    <h2>Overwatch Heroes</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/matches/ow")}>Matches</button>
                    {heroes !== {} && heroes.map(hero =>
                        <div className="hero m-1 h"  onClick={() => getHeroStats(hero.hero_name)}>
                            <span className="heroname fw-bold">{hero.hero_name}</span>
                            <span className="d-block">Role: {hero.drole}</span>
                            <span className="d-block">Ultimate: {hero.ultimateability}</span>
                            <span className="d-block">E-Ability: {hero.eability}</span>
                            <span className="d-block">Shift-Ability: {hero.shiftability}</span>
                            {userHeroStats.name === hero.hero_name &&
                            <>
                                <span className="fw-bold">Your Stats</span>
                                <span className="d-block">Eliminations: {userHeroStats.stats.elims}</span>
                                <span className="d-block">Deaths: {userHeroStats.stats.deaths}</span>
                                <span className="d-block">Medals: {userHeroStats.stats.medals}</span>
                                <span className="d-block">Total Wins: {userHeroStats.stats.totwins}</span>
                                <span className="d-block">Total Losses: {userHeroStats.stats.totlosses}</span>
                            </>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;