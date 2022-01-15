import React, { useContext, useState } from "react";
import { LoginContext } from '../../context/LoginContext';
import { trainHero } from "../../server/db";

const TrainButton = ({ updateHeroes, heroId, formatPowerFigure, handleError, navigate, setErrorModal }) => {
    const { trainerData, dispatchTrainerData } = useContext(LoginContext);
    const [trainMessage, setTrainMessage] = useState('');
    const [isTrainButtonDisabled, setIsTrainButtonDisabled] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [trainMessageClass, setTrainMessageClass] = useState('');

    const onClickTrainHero = async () => {
        setIsButtonLoading(true);

        trainHero(trainerData.token, heroId).then((result) => {
            setIsButtonLoading(false);
            setIsTrainButtonDisabled(true);

            const gained = formatPowerFigure(result.data.powerGained);
            setTrainMessageClass('message');
            setTrainMessage(`Gained - ${gained} power`);
            updateHeroes();
        }, (err) => {
            setIsButtonLoading(false);
            setIsTrainButtonDisabled(true);
            if (err?.response?.status === 405) {
                setTrainMessageClass('error');
                setTrainMessage('Hero is too tired to train');
            } else {
                handleError(
                    err.response || { error: err, status: 500 },
                    dispatchTrainerData,
                    navigate,
                    setErrorModal
                );
            }
        });

        setTimeout(() => {
            setTrainMessage('');
            setIsTrainButtonDisabled(false);
            setTrainMessageClass('');
        }, 2000);
    };

    return (
        <div className='button-container'>
            <p className={trainMessageClass}>{trainMessage}</p>
            <button
                className={isButtonLoading ? 'button--loading' : ''}
                disabled={isTrainButtonDisabled}
                onClick={onClickTrainHero}
            >Train</button>
        </div>
    );
};

export default TrainButton;