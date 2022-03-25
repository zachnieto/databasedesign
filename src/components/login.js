import React, {useState} from "react";

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onLoginSignup = () => {
        let endpoint = "signup"
        if (loggedIn)
            endpoint = "login"

        fetch(`http://localhost:3000/${endpoint}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <div className="row">
            <div className="col-4"/>
            <div className="col-4">
                <input className="form-control m-1" onChange={event => setUsername(event.target.value)} placeholder="Username"/>
                <input className="form-control m-1" onChange={event => setPassword(event.target.value)} placeholder="Password" type="password"/>
                <button className="btn btn-primary" onClick={onLoginSignup}>{loggedIn ? "Sign In" : "Sign Up"}</button>
                <p className="hover-hand" onClick={() => setLoggedIn(!loggedIn)}>
                    {loggedIn ? "Need to register?" : "Already have an account?"}
                </p>
            </div>
            <div className="col-4"/>
        </div>
    )

}

export default Login