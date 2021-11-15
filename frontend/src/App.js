import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";


function App() {
    const [authResponse, setAuthResponse] = useState(false)

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/login"
                           element={<Login setAuthResponse={setAuthResponse}/>}/>
                    <Route path="/create" element={<CreateEvent authResponse={authResponse}/>}/>
                    <Route path="*" element={<Login setAuthResponse={setAuthResponse}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
