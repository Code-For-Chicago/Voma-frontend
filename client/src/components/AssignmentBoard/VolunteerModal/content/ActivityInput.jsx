import React, { useState, useEffect } from 'react';
import { StyledInput } from '../../../../styles/components/Input.style';

const ActivityInput = ({ initialValue, storeNewValue, id, isNew }) => {
    const [value, setValue] = useState("");

    const setNewValue = (e) => {
        const name = e.currentTarget.value;
        const eventId = e.currentTarget.id;

        setValue(name);
        storeNewValue(eventId, name, isNew);
    }

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
        }
    }, [initialValue]);

    return (
        <StyledInput
            type='text'
            value={value}
            id={id}
            placeholder="Add New Acitivity"
            onChange={setNewValue}
        />
    )
};

export default ActivityInput;
