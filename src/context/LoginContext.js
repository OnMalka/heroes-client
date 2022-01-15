import React, { createContext, useReducer } from "react";
import { getTokenFromSessionStorage, getTrainerFromSessionStorage } from "../sessionStorage/sessionStorage";
import loginReducer, { trainerDataInitialState } from '../reducers/loginReducer';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const sessionStorageTrainerData = getTrainerFromSessionStorage();
    const sessionStorageToken = getTokenFromSessionStorage();
    const [trainerData, dispatchTrainerData] = useReducer(loginReducer, { trainer: sessionStorageTrainerData, token: sessionStorageToken } || trainerDataInitialState);

    return (
        <LoginContext.Provider value={{ trainerData, dispatchTrainerData }}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;