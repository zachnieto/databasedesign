import React, {useRef} from "react";
import api from "../services/server-service";
import {useNavigate, Navigate} from "react-router-dom";

const Profile = ({session, setSession}) => {

    const navigate = useNavigate()
    const password = useRef()

    const logOut = async () => {
        await api.get(`http://localhost:4000/logout`)
        navigate("/")
        setSession({})
    }

    const deleteAccount = async () => {
        await api.delete(`http://localhost:4000/account/${session.user.userName}`)
        navigate("/")
        setSession({})
    }

    const updateAccount = async () => {
        await api.put(`http://localhost:4000/account`, {
            params: {
                password: password.current.value,
            }
        })
    }

    if (!session.user)
        return <Navigate to="/"/>;

    return (
        <div>
            <h1>PROFILE</h1>
            <div className="row align-items-center justify-content-center">
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
            </div>
        </div>
    );
}

export default Profile;