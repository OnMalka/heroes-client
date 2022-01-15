import React, { useContext } from "react";
import { Navigate } from "react-router";
import { LoginContext } from "../context/LoginContext";

const PrivateRoute = ({ children }) => {
    const { trainerData } = useContext(LoginContext);

    return !!trainerData.trainer ? children : <Navigate to='/login' />;
};

export default PrivateRoute;