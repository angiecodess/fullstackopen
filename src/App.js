import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Search from './components/Search'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(initialphonebook => setPersons(initialphonebook))
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const nameObj = {
            name: newName,
            number: newNumber
        }
        const contains = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())
        if (contains === -1) {
            personService
                .create(nameObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setMsg(`Added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setMsg(null)
                    },5000)
                }
                )
        } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const person = persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase())
            const updatedNumber = { ...person, number: newNumber }
            personService
                .update(person.id, updatedNumber)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.name.toLowerCase() !== newName.toLowerCase() ? p : returnedPerson))
                    setMsg(`${returnedPerson.name}'s number is updated.`)
                    setTimeout(() => {
                        setMsg(null)
                    },5000)
                })
                .catch(err => {
                    setMsg(`Information of ${newName} has already been removed from server.`)
                    setTimeout(() => {
                        setMsg(null)
                    },5000)
                })
        }
    }

    const deleteNumber = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                setPersons(persons.filter(p => p.id !== id))
                setMsg(`${name} deleted.`)
                setTimeout(() => {
                    setMsg(null)
                },5000)
        }
    }


    const personstoshow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification msg = {msg} />
            <h3>Search</h3>
            <Search value={search} handler={handleSearch} />
            <Form newName={newName} newNumber={newNumber}
                nameHandler={handleNameChange} numberHandler={handleNumberChange}
                personHandler={addPerson} />
            <h2>Numbers</h2>
            <ul>
                {personstoshow.map(person => <Person key={person.name} name={person.name} number={person.number} handler={() => deleteNumber(person.id, person.name)} />
                )}
            </ul>
        </div>
    )
}

export default App
