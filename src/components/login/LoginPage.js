import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SubscribeForm from "./SubscribeForm";

const LoginPage = (props) => {
    const errorMessage = props.location?.state?.needToLogin ? 'You must login!' : '';
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <div className='login-page'>
            <div className='login-page__form'>
                {isLoginMode ?
                    <LoginForm setIsLoginMode={setIsLoginMode} errorMessage={errorMessage} /> :
                    <SubscribeForm setIsLoginMode={setIsLoginMode} />
                }
            </div>
        </div>
    );
};

export default LoginPage;