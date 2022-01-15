import React from "react";

const ErrorModal = ({ message, showModal }) => (
    <div className={`modal-container${showModal ? ' modal-container--show' : ' modal-container--hide'}`}>
        <div className="error-modal">
            <h1>{message}</h1>
        </div>
    </div>
);

export default ErrorModal;