import React, {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import api from "../services/server-service";

const Login = ({session, setSession}) => {
    const [loggedIn, setLoggedIn] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const onLoginSignup = async () => {
        const endpoint = loggedIn ? "login" : "account"

        await api.post(`http://localhost:4000/${endpoint}`, {
                params: {
                    username: username,
                    password: password
                },
            })
            .then((resp) => {
                setSession({...session, user: resp.data})
                navigate("/profile")
                console.log(session)
            })
            .catch(e => {
                setError(e.response.data)
            });

    }

    if (session.user)
        return <Navigate to="/profile" />;

    return (
        <div className="row align-items-center justify-content-center pt-5">
            <div className="col-4">
                <input className="form-control m-1" onChange={event => setUsername(event.target.value)} placeholder="Username"/>
                <input className="form-control m-1" onChange={event => setPassword(event.target.value)} placeholder="Password" type="password"/>
                <button className="btn btn-primary" onClick={onLoginSignup}>{loggedIn ? "Sign In" : "Sign Up"}</button>
                <h5>{error}</h5>
                <p className="hover-hand" onClick={() => setLoggedIn(!loggedIn)}>
                    {loggedIn ? "Need to register?" : "Already have an account?"}
                </p>
            </div>
        </div>
    )

}

export default Login