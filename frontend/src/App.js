import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import EventTimeline from "./pages/EventTimeline";


function App() {
    const [authResponse, setAuthResponse] = useState("")

    function setAuth(response){
        console.log(response)
        setAuthResponse(response)
        console.log(authResponse)
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login authResponse={authResponse} setAuthResponse={setAuth}/>}/>
                    <Route path="/create" element={<CreateEvent authResponse={authResponse}/>}/>
                    <Route path="/events" element={<EventTimeline authResponse={authResponse}/>}/>
                    <Route path="*" element={<Login authResponse={authResponse} setAuthResponse={setAuth}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
