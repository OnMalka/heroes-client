import React from "react";

const SuitColors = ({ suitColors }) => (
    <details>
        <summary>Suit Colors</summary>
        {suitColors.map(({ item, color, _id }) =>
            <span className='suit-color' key={_id}>
                <p>{item}</p>
                <div style={{ backgroundColor: color }}></div>
            </span>
        )}
    </details>
);

export default SuitColors;