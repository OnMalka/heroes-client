import React, { useContext } from "react";
import { Navigate } from "react-router";
import { LoginContext } from "../context/LoginContext";

const LoginRoute = ({ children }) => {
    const { trainerData } = useContext(LoginContext);
    return !!trainerData.trainer ? <Navigate to='/heroes/all' /> : children;
};

export default LoginRoute;