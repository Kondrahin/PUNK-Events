import React from 'react';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {deleteCookie, setCookie} from "../services/cookie";
import {LoginNavigation} from "../components/UI/Navigation/Navigation";
import toast from "react-hot-toast";
import './Login.css'

const Login = () => {
    const setGoogleToken = (response) => {
        let token = response.getAuthResponse()
        setCookie("token", token)
        toast('Вход выполнен успешно!', {icon: '✅'});
    }

    const failureResponseGoogle = (response) => {
        alert("Turn off AdBlock, clean the browser cache and try again")
    }

    const deleteGoogleToken = (response) => {
        deleteCookie("token")
        toast('Выход выполнен успешно!', {icon: '✅'});
    }

    return (
        <div>
            <h1 className="display-4">Для того, чтобы начать пользоваться сервисом, войдите в свой st аккаунт.</h1>
            <LoginNavigation/>
            <div className="position-absolute top-50 start-50 translate-middle">
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
        </div>
    );
};

export default Login
