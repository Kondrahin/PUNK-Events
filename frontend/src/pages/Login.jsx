import React from 'react';
import MyGoogleLogin from "../API/GoogleLogin";

const Login = ({setAuthResponse}) => {

    return (
        <div>
            <MyGoogleLogin setAuthResponse={setAuthResponse}/>
        </div>
    );
};

export default Login;
