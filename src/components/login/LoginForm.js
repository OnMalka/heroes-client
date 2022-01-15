import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginAction, updateTokenAction } from "../../actions/loginActions";
import { LoginContext } from "../../context/LoginContext";
import { saveTrainerOnSessionStorage } from "../../sessionStorage/sessionStorage";
import { loginToSite, regainToken } from "../../server/auth";

const LoginForm = (props) => {
    const { dispatchTrainerData } = useContext(LoginContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    useEffect(() => {
        if (props.errorMessage !== '') {
            setErrorMessage(props.errorMessage);
        };
    }, [props.errorMessage]);

    const navigate = useNavigate();

    const isFormValid = () => {
        return email === '' || password === '';
    };

    const onBlurEmailInput = (event) => {
        const theEmail = event.target.value.trim();
        if (theEmail === '') {
            setEmail('');
            setIsEmailInputValid(false);
        } else {
            setEmail(theEmail);
            setIsEmailInputValid(true);
        }
    };

    const onChangePasswordInput = (event) => {

        const thePassword = event.target.value.trim();
        setPassword(thePassword === '' ? '' : thePassword);
        setIsPasswordInputValid(thePassword !== '');
    };

    const onSubmitForm = (event) => {
        event.preventDefault();

        setIsButtonLoading(true);

        loginToSite(email, password).then(
            (trainerData) => {
                dispatchTrainerData(loginAction(trainerData));
                saveTrainerOnSessionStorage(trainerData);
                setTimeout(() => { // timer for token expiry date
                    const newToken = regainToken(trainerData.token);
                    dispatchTrainerData(updateTokenAction(newToken));
                }, 1000 * 60 * 60 * 6 - 1000 * 60 * 5); // 5:55 H:MM
                navigate('/heroes/all');
            },
            (err) => {
                setIsButtonLoading(false);
                if (err?.response?.status === 400) {
                    setErrorMessage('Email or password invalid.');
                } else
                    setErrorMessage('Server error. Please try again later.');
            }
        );
    };

    const onClickSubscribe = () => {
        props.setIsLoginMode(false);
    };

    return (
        <div className='login-form'>
            <h3>Login</h3>
            {errorMessage !== '' && <div className='error-message'>{errorMessage}</div>}
            <form onSubmit={onSubmitForm}>
                <input placeholder='Email' onBlur={onBlurEmailInput}></input>
                {!isEmailInputValid && <div className='invalid-message'>You must enter your email.</div>}
                <input type='password' placeholder='Password' onChange={onChangePasswordInput}></input>
                {!isPasswordInputValid && <div className='invalid-message'>You must enter your password.</div>}
                <div className='login-form__nav'>
                    <button className={isButtonLoading ? 'button--loading' : ''} type='submit' disabled={isFormValid()}>Submit</button>
                    <div onClick={onClickSubscribe}>Subscribe</div>
                </div>
            </form>
        </div >
    );
};

export default LoginForm;