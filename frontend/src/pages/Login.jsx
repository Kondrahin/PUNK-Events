import React from 'react';
import MyGoogleLogin from "../API/GoogleLogin";

const Login = ({authResponse, setAuthResponse}) => {

    return (
        <div>
            <MyGoogleLogin authResponse={authResponse} setAuthResponse={setAuthResponse}/>
        </div>
    );
};

export default Login;
