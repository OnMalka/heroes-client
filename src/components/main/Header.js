import React, { useContext, useState } from "react";
import { NavLink } from 'react-router-dom';
import { logoutAction } from "../../actions/loginActions";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router";
import { DeleteTrainerFromSessionStorage } from "../../sessionStorage/sessionStorage";
import { logoutFromSite } from "../../server/auth";
import handleError from "../../utils/handleError";
import ErrorModal from "./ErrorModal";

const Header = () => {
    const { trainerData, dispatchTrainerData } = useContext(LoginContext);
    const [errorModal, setErrorModal] = useState({ message: '', showModal: false });
    const navigate = useNavigate();

    const onClickLogOut = async () => {
        try {
            await logoutFromSite(trainerData.trainer, trainerData.token);
            dispatchTrainerData(logoutAction());
            DeleteTrainerFromSessionStorage();
            navigate('/home');
        } catch (err) {
            handleError(
                err.response || { error: err, status: 500 },
                dispatchTrainerData,
                navigate,
                setErrorModal
            );
        };
    };

    return (
        <>
            <div className='header'>
                <div className='header__nav'>
                    <div>
                        <NavLink to='/heroes/all' className={(linkData) => linkData.isActive ? 'header__active-link' : ''}>All Heroes</NavLink>
                        <NavLink to='/heroes/my' className={(linkData) => linkData.isActive ? 'header__active-link' : ''}>My Heroes</NavLink>
                    </div>
                    <div>
                        {
                            !!trainerData.trainer ?
                                <div className='header__logout-nav' onClick={onClickLogOut}>Logout</div> :
                                <NavLink to='/login' className={(linkData) => linkData.isActive ? 'header__active-link' : ''}>Login</NavLink>
                        }
                    </div>
                </div>
            </div>
            <ErrorModal message={errorModal.message} showModal={errorModal.showModal} />
        </>
    );
};

export default Header;