import React from 'react'

const Form = ({ newName, newNumber, nameHandler, numberHandler, personHandler }) => {
    return (
        <form onSubmit={personHandler}>
            <div>
                name: <input value={newName} onChange={nameHandler} />
            </div>
            <div>
                number: <input value={newNumber} onChange={numberHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form