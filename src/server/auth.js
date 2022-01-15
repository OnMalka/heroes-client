import axios from "axios";
import configurations from "../config/configurations";

const heroesApiURL = configurations().heroesApiURL;

export const subscribeToSite = async (name, email, password) => {
    const res = await axios.post(`${heroesApiURL}trainer/signup`, {
        name,
        email,
        password
    });
    return {
        token: res.data.token,
        trainer: res.data.trainer
    };
};

export const loginToSite = async (email, password) => {
    console.log(heroesApiURL);
    const res = await axios.post(`${heroesApiURL}trainer/login`, {
        email,
        password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });


    return {
        trainer: res.data.trainer,
        token: res.data.token
    };
};

export const regainToken = async (token) => {
    const response = await axios.get(`${heroesApiURL}trainer/regain-token`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return { token: response.data.token };
};

export const logoutFromSite = async (trainer, token) => {
    await axios.post(`${heroesApiURL}trainer/logout`, {
        trainer
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
};