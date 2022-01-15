import axios from 'axios';
import configurations from '../config/configurations';

const heroesApiURL = configurations().heroesApiURL;

export const getAllHeroesFromDB = async (token) => {
    const response = await axios.get(`${heroesApiURL}heroes?trained-by=all`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return response;
};

export const getMyHeroesFromDB = async (token) => {
    const response = await axios.get(`${heroesApiURL}heroes?trained-by=me`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return response;
};

export const trainHero = async (token, id) => {
    const response = await axios.patch(`${heroesApiURL}heroes/${id}`, {}, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return response;
};