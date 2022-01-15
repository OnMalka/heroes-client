export const saveTrainerOnSessionStorage = (loginData) => {
    const jsonTrainerData = JSON.stringify(loginData.trainer);
    sessionStorage.setItem('trainer-data', jsonTrainerData);
    sessionStorage.setItem('token', loginData.token);
};

export const DeleteTrainerFromSessionStorage = () => {
    sessionStorage.removeItem('trainer-data');
    sessionStorage.removeItem('token');
};

export const getTrainerFromSessionStorage = () => {
    const jsonTrainerData = sessionStorage.getItem('trainer-data');
    if (jsonTrainerData === undefined)
        return null;

    return JSON.parse(jsonTrainerData);
};

export const getTokenFromSessionStorage = () => {
    const token = sessionStorage.getItem('token');
    if (token === undefined)
        return null;

    return token;
};