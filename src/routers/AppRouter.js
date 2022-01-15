import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllHeroesPage from "../components/heroes/AllHeroesPage";
import MyHeroesPage from "../components/heroes/MyHeroesPage";
import LoginPage from "../components/login/LoginPage";
import Header from "../components/main/Header";
import PageNotFound from "../components/main/PageNotFound";
import LoginContextProvider from "../context/LoginContext";
import LoginRoute from "./LoginRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {

    return (
        <BrowserRouter>
            <LoginContextProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Navigate to="/login" />} />
                    <Route
                        path='/login'
                        element={
                            <LoginRoute>
                                <LoginPage />
                            </LoginRoute>
                        }
                    />
                    <Route
                        path='/heroes/all'
                        element={
                            <PrivateRoute>
                                <AllHeroesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/heroes/my'
                        element={
                            <PrivateRoute>
                                <MyHeroesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </LoginContextProvider>
        </BrowserRouter>
    );
};

export default AppRouter;