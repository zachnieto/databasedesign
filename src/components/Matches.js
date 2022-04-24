import {useParams, Navigate, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import api, {BACKEND_SERVER} from "../services/server-service";

const Matches = ({session}) => {

    const navigate = useNavigate()
    const {game} = useParams()
    const [matches, setMatches] = useState([])
    const deaths = useRef()
    const elims = useRef()
    const type = useRef()
    const hero = useRef()
    const lasthits = useRef()
    const medals = useRef()
    const result = useRef()
    const assists = useRef()
    const lane = useRef()
    const towersDestroyed = useRef()
    const [error, setError] = useState('')

    const getMatches = async () => {
        const endpoint = game === "ow" ? "owmatches" : "lolmatches"
        const resp = await api.get(`${BACKEND_SERVER}/${endpoint}/${session.user.userName}`)
        setMatches(resp.data)
        console.log(resp.data)
    }

    useEffect(() => {
        if (session.user) {
            getMatches()
        }
        else if (session.cookie && !session.user) {
            console.log(session)
            navigate("/")
        }
    }, [session])


    const deleteMatch = async (matchId) => {
        if (game === "lol") {
            await api.delete(`${BACKEND_SERVER}/lolmatches/${matchId}`)
            setMatches(matches.filter(match => match.usermatchid !== matchId))
        }
        else {
            await api.delete(`${BACKEND_SERVER}/owmatches/${matchId}`)
            setMatches(matches.filter(match => match.owusermatchid !== matchId))
        }
    }

    const addOwMatch = async () => {
        await api.post(`${BACKEND_SERVER}/owmatches`, {
            params: {
                hero: hero.current.value,
                lasthits: lasthits.current.value,
                deaths: deaths.current.value,
                elims: elims.current.value,
                type: type.current.value,
                medals: medals.current.value,
                result: result.current.value
            }
        }).catch(err => setError(err.response.data))
        getMatches()
    }

    const addLolMatch = async () => {
        await api.post(`${BACKEND_SERVER}/lolmatches`, {
            params: {
                champion: hero.current.value,
                kills: elims.current.value,
                deaths: deaths.current.value,
                assists: assists.current.value,
                tows: towersDestroyed.current.value,
                lane: lane.current.value,
                result: result.current.value
            }
        }).catch(err => setError(err.response.data))
        getMatches()
    }

    if (!["lol", "ow"].includes(game))
        return <Navigate to="/profile"/>

    return (
        <div>
            <h1>{game === "lol" ? "League Of Legends " : "Overwatch "} Matches</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    {game === "lol" ?
                        <>
                        <th scope="col">Champion</th>
                        <th scope="col">Kills</th>
                        <th scope="col">Deaths</th>
                        <th scope="col">Assists</th>
                        <th scope="col">Lane</th>
                        <th scope="col">Towers Destroyed</th>
                        </>
                        :
                        <>
                            <th scope="col">Hero</th>
                            <th scope="col">Gamemode</th>
                            <th scope="col">Eliminations</th>
                            <th scope="col">Deaths</th>
                            <th scope="col">LastHits</th>
                            <th scope="col">Medals</th>
                        </>
                    }
                    <th scope="col">Result</th>
                </tr>
                </thead>
                <tbody>
                {game === "lol" && <>{matches.map((match, i) =>
                    <tr key={i} className={`result-${match.result}`}>

                        <th scope="row">{i + 1}</th>
                        <td>{match.champion}</td>
                        <td>{match.kills}</td>
                        <td>{match.deaths}</td>
                        <td>{match.assists}</td>
                        <td>{match.lane}</td>
                        <td>{match.towersDestroyed}</td>
                        <td>{match.result}</td>
                        <td><button className="btn btn-sm float-end" onClick={() => deleteMatch(match.usermatchid)}>Delete Match</button></td>
                    </tr>
                )}
                    <tr className="">

                        <th scope="row"/>
                        <td><input ref={hero} className="form-control" placeholder="Champion"/></td>
                        <td><input ref={elims} className="form-control" placeholder="Kills"/></td>
                        <td><input ref={deaths} className="form-control" placeholder="Deaths"/></td>
                        <td><input ref={assists} className="form-control" placeholder="Assists"/></td>
                        <td><input ref={lane} className="form-control" placeholder="Lane"/></td>
                        <td><input ref={towersDestroyed} className="form-control" placeholder="Towers Destroyed"/></td>
                        <td><input ref={result} className="form-control" placeholder="Result"/></td>
                        <td><button className="btn btn-primary btn-sm float-end"
                                    onClick={addLolMatch}>Add Match</button></td>
                    </tr>
                </>}


                {game === "ow" && <>{matches.map((match, i) =>
                    <tr key={i} className={`result-${match.result}`}>

                        <th scope="row">{i + 1}</th>
                        <td>{match.hero}</td>
                        <td>{match.gametype}</td>
                        <td>{match.eliminations}</td>
                        <td>{match.deaths}</td>
                        <td>{match.lasthits}</td>
                        <td>{match.medals}</td>
                        <td>{match.result}</td>
                        <td><button className="btn btn-sm float-end" onClick={() => deleteMatch(match.owusermatchid)}>Delete Match</button></td>
                    </tr>

                )}
                    <tr className="">

                        <th scope="row"/>
                        <td><input ref={hero} className="form-control" placeholder="Hero"/></td>
                        <td><input ref={type} className="form-control" placeholder="Gamemode"/></td>
                        <td><input ref={elims} className="form-control" placeholder="Eliminations"/></td>
                        <td><input ref={deaths} className="form-control" placeholder="Deaths"/></td>
                        <td><input ref={lasthits} className="form-control" placeholder="LastHits"/></td>
                        <td><input ref={medals} className="form-control" placeholder="Medals"/></td>
                        <td><input ref={result} className="form-control" placeholder="Result"/></td>
                        <td><button className="btn btn-primary btn-sm float-end"
                        onClick={addOwMatch}>Add Match</button></td>
                    </tr>
                </>
                }



                </tbody>
            </table>

            <h2>{error}</h2>

        </div>
    );
}

export default Matches;