import React from "react";
import GoogleLogin, {GoogleLogout} from 'react-google-login';


const MyGoogleLogin = ({setAuthResponse}) => {

    const setGoogleToken = (response) => {
        setAuthResponse(response.getAuthResponse())
        console.log(response.getAuthResponse())
    }

    const failureResponseGoogle = (response) => {
        alert("Turn off AdBlock, clean the browser cache and try again")
    }

    const deleteGoogleToken = (response) => {
        setAuthResponse()
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
