import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import EventTimeline from "./pages/EventTimeline";
import NotFound from "./pages/NotFound";


function App() {

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/create" element={<CreateEvent/>}/>
                    <Route path="/events" element={<EventTimeline/>}/>
                    <Route path="/events/*" element={<CreateEvent/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
