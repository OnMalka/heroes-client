import React from "react";

const LastTrainings = ({ lastTrainings }) => (
    lastTrainings?.length > 0 ?
        <details>
            <summary>Last Trainings</summary>
            {
                lastTrainings.map(({ date, powerGained, _id }) => {
                    const parsedDate = new Date(date);
                    const formattedPowerGained = powerGained.toString().slice(0, 4);
                    return (
                        <span className='todays-trainings' key={_id}>
                            <p>At: {parsedDate.getHours()}:{parsedDate.getMinutes()}</p>
                            <p>Power Gained: {formattedPowerGained}</p>
                        </span>
                    );
                })

            }
        </details> :
        <div></div>
);

export default LastTrainings;