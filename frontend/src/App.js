import './App.css';
import React, {useState} from 'react';
import MyGoogleLogin from "./API/GoogleLogin";

function App() {

    const [authResponse, setAuthResponse] = useState()

    return (
      <div className="App">
        <MyGoogleLogin authResponse={authResponse} setAuthResponse={setAuthResponse}/>
      </div>
    );
}

export default App;
