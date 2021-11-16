import React from "react";
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {deleteCookie, getCookie, setCookie} from "../services/cookie";

const MyGoogleLogin = ({authResponse, setAuthResponse}) => {

    const setGoogleToken = (response) => {
        console.log(response.getAuthResponse())
        let token = response.getAuthResponse()
        setCookie("token", token)
        token = getCookie("token")
        // for (i in token{}
        console.log(JSON.stringify(getCookie("token")))
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

export default MyGoogleLogin
