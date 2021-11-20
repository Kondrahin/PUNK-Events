import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import EventTimeline from "./pages/EventTimeline";


function App() {

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/create" element={<CreateEvent/>}/>
                    <Route path="/events" element={<EventTimeline/>}/>
                    <Route path="*" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
