import { logoutAction } from "../actions/loginActions";
import { DeleteTrainerFromSessionStorage } from "../sessionStorage/sessionStorage";

const handleError = async (err, dispatchTrainerData, navigate, setErrorModal) => {
    switch (err.status) {
        case 401:
            dispatchTrainerData(logoutAction());
            DeleteTrainerFromSessionStorage();
            navigate('/login');
            break;
        default:
            setErrorModal({ message: 'Server error.  Please try again in a few minutes', showModal: true });
            setTimeout(() => {
                setErrorModal({ message: '', showModal: false });
            }, 3000);
            break;
    };
};

export default handleError;