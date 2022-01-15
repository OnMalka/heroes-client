import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { LoginContext } from '../../context/LoginContext';
import { getMyHeroesFromDB } from '../../server/db';
import ErrorModal from '../main/ErrorModal';
import Loader from '../main/Loader';
import HeroCard from './HeroCard';
import handleError from '../../utils/handleError';

const MyHeroesPage = () => {
    const { trainerData, dispatchTrainerData } = useContext(LoginContext);
    const [heroes, setHeroes] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [errorModal, setErrorModal] = useState({ message: '', showModal: false });

    const navigate = useNavigate();

    const updateHeroes = useCallback(() => {
        getMyHeroesFromDB(trainerData.token).then((heroesArray) => {
            setShowLoader(false);
            setHeroes(heroesArray.data);
        }).catch((err) => {
            setShowLoader(false);
            handleError(
                err.response || { error: err, status: 500 },
                dispatchTrainerData,
                navigate,
                setErrorModal
            );
        });
    }, [dispatchTrainerData, navigate, trainerData.token]);

    useEffect(() => {
        updateHeroes();
    }, [updateHeroes]);

    return (
        <>
            {showLoader ?
                <Loader /> :
                <div className='all-heroes-page'>
                    {heroes?.length > 0 &&
                        heroes.map((hero) =>
                            <div key={hero._id} className='hero-container'>
                                <HeroCard hero={hero} showExtraDetails={true} updateHeroes={updateHeroes} handleError={handleError} navigate={navigate} setErrorModal={setErrorModal} />
                            </div>
                        )}
                </div>}
            <ErrorModal message={errorModal.message} showModal={errorModal.showModal} />
        </>
    );
};

export default MyHeroesPage;