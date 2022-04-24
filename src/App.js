import './App.css';
import Login from "./components/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Profile from "./components/Profile";
import api, {BACKEND_SERVER} from "./services/server-service";
import Matches from "./components/Matches";

function App() {

    const [session, setSession] = useState({})


    useEffect(() => {
        const loadSession = async () => {
            const sess = await api.get(`${BACKEND_SERVER}/session`)
            console.log(sess.data)
            setSession(sess.data)
        }
        loadSession()
    }, [])

    return (
    <div className="App">
      <div className="container">
          <Router>
              <Routes>
                  <Route path="/" element={<Login session={session} setSession={setSession}/>} />
                  <Route path="/profile" element={<Profile session={session} setSession={setSession}/>} />
                  <Route path="/matches/:game" element={<Matches session={session}/>} />
              </Routes>
          </Router>
      </div>
    </div>
    );
}

export default App;
