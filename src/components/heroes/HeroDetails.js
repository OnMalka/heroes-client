import React from 'react';
import SuitColors from "./SuitColors";
import TrainButton from './TrainButton';
import LastTrainings from "./LastTrainings";

const HeroDetails = ({ hero, showExtraDetails, updateHeroes, handleError, navigate, setErrorModal }) => {

    const formatPowerFigure = (power) => {
        const powerString = power.toString();
        return (
            powerString.slice(0, powerString.indexOf('.') + 3)
        );
    };
    const formatFirstTrainedDate = (date) => date.split('T')[0].replaceAll('-', '/');

    return (
        <div className='hero-details'>
            <div className='hero-details__info'>
                <p>Starting Power: {hero.startingPower === 'Private' ? 'Private' : (formatPowerFigure(hero.startingPower))}</p>
                <p>Current Power: {hero.currentPower === 'Private' ? 'Private' : (formatPowerFigure(hero.currentPower))}</p>
                {!!hero.firstTrained && <p>First Training: {formatFirstTrainedDate(hero.firstTrained)}</p>}
                {showExtraDetails && <SuitColors suitColors={hero.suitColors} />}
                {showExtraDetails && <LastTrainings lastTrainings={hero.lastTrainings} />}
            </div>
            {showExtraDetails && <TrainButton updateHeroes={updateHeroes} heroId={hero._id} formatPowerFigure={formatPowerFigure} handleError={handleError} navigate={navigate} setErrorModal={setErrorModal} />}
        </div>
    );

};

export default HeroDetails;