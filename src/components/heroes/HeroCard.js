import React from "react";
import shieldImage from '../../images/shield.png';
import swordImage from '../../images/sword.png';
import HeroDetails from "./HeroDetails";

const HeroCard = ({ hero, showExtraDetails = false, updateHeroes, handleError, navigate, setErrorModal }) => {

    return (
        <div className='hero-card'>
            <div className='hero-card__title'>
                <h1>{hero.name}</h1>
                <img src={hero.ability === 'attacker' ? swordImage : shieldImage} alt={hero.ability} />
            </div>
            <img className='hero-card__profile-picture' src={hero.imageURL} alt={hero.name} />
            <HeroDetails hero={hero} showExtraDetails={showExtraDetails} updateHeroes={updateHeroes} handleError={handleError} navigate={navigate} setErrorModal={setErrorModal} />
        </div >
    );
};

export default HeroCard;