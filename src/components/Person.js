import React from 'react'

const Person = ({ name, number, handler }) => {
    return(
    <li>
        {name + ' ' + number}
        <button onClick={handler}>delete</button>
    </li>
    )
}

export default Person