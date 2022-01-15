import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { loginAction } from "../../actions/loginActions";
import { LoginContext } from "../../context/LoginContext";
import { saveTrainerOnSessionStorage } from "../../sessionStorage/sessionStorage";
import { regainToken, subscribeToSite } from "../../server/auth";

const SubscribeForm = (props) => {
    const { dispatchTrainerData } = useContext(LoginContext);

    const [inputClasses, setInputClasses] = useState(['', '', '', '']);
    const [invalidMessages, setInvalidMessages] = useState(['', '', '', '']);
    const [validInputs, setValidInputs] = useState([false, false, false, false]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const navigate = useNavigate();

    const isFormInvalid = () => {
        return validInputs.includes(false);
    };

    const validateInput = (
        value,
        inputIndex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isValidInput) => {
            const newInvalidMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newValidInputs = [...validInputs];
            newInvalidMessages[inputIndex] = message;
            setInvalidMessages(newInvalidMessages);
            newInputClasses[inputIndex] = inputClass;
            setInputClasses(newInputClasses);
            newValidInputs[inputIndex] = isValidInput;
            setValidInputs(newValidInputs);
        };

        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs('', '', true);
                setValue(value);
            } else {
                setStateOfInputs(invalidValueMessage, 'input-invalid', false);
            }
        } else {
            setStateOfInputs(missingValueMessage, 'input-invalid', false);
        }
    };

    const onBlurName = (event) => {
        const newName = event.target.value.trim();
        const isNameValid = (value) => {
            return value.length > 2;
        };
        validateInput(
            newName,
            0,
            isNameValid,
            setName,
            'You must enter a name',
            'Name must be min 3 characters'
        );
    };

    const onBlurEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(
            newEmail,
            1,
            validator.isEmail,
            setEmail,
            'You must enter email',
            'Email invalid'
        );
    };

    const onBlurPassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
            return passwordRegex.test(value);
        };
        validateInput(
            newPassword,
            2,
            isPasswordValid,
            setPassword,
            'You must enter password',
            'Password must contain numbers, capital, regular and spacial characters and must have at least 8 characters'
        );
    };

    const onChangePasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = (value) => {
            return password === passwordRepeated;
        };
        validateInput(
            passwordRepeated,
            3,
            isPasswordRepeatedValid,
            () => { },
            'You must enter your password again',
            'The two passwords do not match'
        );
    };

    const onSubmitForm = (event) => {
        event.preventDefault();

        setIsButtonLoading(true);

        subscribeToSite(name, email, password).then(
            (trainerData) => {
                dispatchTrainerData(loginAction(trainerData));
                saveTrainerOnSessionStorage(trainerData);
                setTimeout(() => {
                    regainToken(trainerData.token);
                }, 1000 * 60 * 60 * 6 - 1000 * 60 * 5); // 5:55 H:MM
                navigate('/heroes/all');
            },
            (err) => {
                setIsButtonLoading(false);
                if (err?.response?.status === 400) {
                    setErrorMessage('Email exists. Try a different email.');
                } else
                    setErrorMessage('Server error. Please try again later.');
            }
        );
    };

    const onClickLogin = () => {
        props.setIsLoginMode(true);
    };

    return (
        <div className='login-form'>
            <h3>Subscribe</h3>
            {errorMessage !== '' && <div className='error-message'>{errorMessage}</div>}
            <form onSubmit={onSubmitForm}>
                <input placeholder='name' className={inputClasses[0]} onBlur={onBlurName} />
                {invalidMessages[0] !== '' && <div className='invalid-message'>{invalidMessages[0]}</div>}
                <input placeholder='Email' className={inputClasses[1]} onBlur={onBlurEmail} />
                {invalidMessages[1] !== '' && <div className='invalid-message'>{invalidMessages[1]}</div>}
                <input placeholder='Password' type='password' className={inputClasses[2]} onBlur={onBlurPassword} />
                {invalidMessages[2] !== '' && <div className='invalid-message'>{invalidMessages[2]}</div>}
                <input placeholder='Repeat on password' type='password' className={inputClasses[3]} onChange={onChangePasswordRepeated} />
                {invalidMessages[3] !== '' && <div className='invalid-message'>{invalidMessages[3]}</div>}

                <div className='login-form__nav'>
                    <button className={isButtonLoading ? 'button--loading' : ''} type='submit' disabled={isFormInvalid()}>Submit</button>
                    <div onClick={onClickLogin}>Login</div>
                </div>
            </form>
        </div>
    );
};

export default SubscribeForm;