import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../../context/LoginContext';
import { getAllHeroesFromDB } from '../../server/db';
import HeroCard from './HeroCard';
import Loader from '../main/Loader';
import ErrorModal from '../main/ErrorModal';
import handleError from '../../utils/handleError';

const AllHeroesPage = () => {
    const { trainerData, dispatchTrainerData } = useContext(LoginContext);
    const [heroes, setHeroes] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [errorModal, setErrorModal] = useState({ message: '', showModal: false });
    const [pageNumber, setPageNumber] = useState(1);

    const navigate = useNavigate();

    const onScrollLoadContent = useCallback(
        () => {
            if ((window.pageYOffset + window.innerHeight) > document.body.offsetHeight - 10) {
                window.removeEventListener('scroll', onScrollLoadContent);
                setPageNumber(pageNumber + 1);
            };
        },
        [pageNumber],
    );

    const updateHeroes = useCallback(() => {
        getAllHeroesFromDB(trainerData.token).then((response) => {
            setShowLoader(false);
            setHeroes(response.data);
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
        window.addEventListener('scroll', onScrollLoadContent);
        return () => {
            window.removeEventListener('scroll', onScrollLoadContent);
        };
    }, [updateHeroes, onScrollLoadContent]);

    const getArrayOfHeroesAccordingToPageNumber = () => {
        const selectedHeroes = [];
        for (let i = 0; i < heroes.length && i < pageNumber * 3; i++) {
            const hero = heroes[i];
            selectedHeroes.push(
                <div key={hero._id} className='hero-container'>
                    <HeroCard hero={hero} showExtraDetails={false} handleError={handleError} navigate={navigate} setErrorModal={setErrorModal} />
                </div>
            );
        };
        return selectedHeroes;
    };

    return (
        <>
            {showLoader ?
                <Loader /> :
                <div className='all-heroes-page'>
                    {getArrayOfHeroesAccordingToPageNumber()}
                </div>}
            <ErrorModal message={errorModal.message} showModal={errorModal.showModal} />
        </>
    );
};

export default AllHeroesPage;