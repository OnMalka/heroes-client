export const trainerDataInitialState = { trainer: null, token: '' };

const loginReducer = (trainerData, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { trainer: { ...action.trainer, heroes: [...action.trainer.heroes] }, token: action.token };
        case 'LOGOUT':
            return { trainer: null, token: '' };
        case 'UPDATE_TRAINER':
            return { ...trainerData, trainer: action.trainer };
        case 'UPDATE_TOKEN':
            return { ...trainerData, token: action.token };
        default:
            return trainerData;
    };
};

export default loginReducer;