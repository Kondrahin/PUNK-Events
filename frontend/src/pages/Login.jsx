import React from 'react';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {deleteCookie, setCookie} from "../services/cookie";
import {LoginNavigation} from "../components/UI/Navigation/Navigation";

const Login = () => {
    const setGoogleToken = (response) => {
        let token = response.getAuthResponse()
        setCookie("token", token)
    }

    const failureResponseGoogle = (response) => {
        alert("Turn off AdBlock, clean the browser cache and try again")
    }

    const deleteGoogleToken = (response) => {
        deleteCookie("token")
        console.log("Successful logout!")
    }

    return (
        <div>
            <LoginNavigation/>
            <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Login"
                onSuccess={setGoogleToken}
                onFailure={failureResponseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                scope={"openid email profile"}
            />
            <GoogleLogout
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={deleteGoogleToken}
            >
            </GoogleLogout>
        </div>
    );
};

export default Login
