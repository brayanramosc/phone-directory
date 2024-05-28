import React from 'react';

const Person = ({ person, handleClick, isSelected }) => {
    return (
        <li
            className='text-lg border-2 rounded-lg p-4 flex flex-row gap-10 justify-between cursor-pointer'
            style={{ background: isSelected ? 'rgb(71 85 105)' : 'white', color: isSelected ? 'white' : 'black' }}
            onClick={handleClick}
        >
            <p>{person.name}</p>
            <p>{person.number}</p>
        </li>
    )
}

export default Person;
