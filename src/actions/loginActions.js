export const loginAction = ({ trainer, token }) => ({
    type: 'LOGIN',
    trainer,
    token
});

export const logoutAction = () => ({
    type: 'LOGOUT'
});

export const updateTrainerAction = (trainer) => ({
    type: 'UPDATE_TRAINER',
    trainer
});

export const updateTokenAction = (token) => ({
    type: 'UPDATE_TOKEN',
    token
});