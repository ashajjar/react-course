import React from 'react';

const Option = (props) => (
    <div>
        <li>
            {props.optionText}
            <button onClick={(e) => {
                props.handleRemoveOption(props.optionText);
            }}>Remove</button>
        </li>
    </div>
);

export default Option;