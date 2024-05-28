import React from 'react'

const CustomInput = ({ name, value, placeholder, handleChange, type = 'text' }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className='border-2 rounded-md pl-2 py-1'
        />
    )
}

export default CustomInput
