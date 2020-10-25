import React, { useState,useEffect } from 'react'
import Form from './components/Form'
import Search from './components/Search'
import Numbers from './components/Numbers'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
      }, [])
      console.log('render', persons.length, 'notes')

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
        const contains = persons.some(person => {
            return JSON.stringify(nameObj) === JSON.stringify(person)
        })

        if (!contains) {
            setPersons(persons.concat(nameObj))
            setNewName('')
            setNewNumber('')
        } else {
            window.alert(newName + ' is already added to phonebook')
        }
    }

    const personstoshow = persons.filter(person => person.name.toLowerCase().includes(search))


    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Search</h3>
            <Search value={search} handler={handleSearch} />
            <Form newName={newName} newNumber={newNumber}
                nameHandler={handleNameChange} numberHandler={handleNumberChange}
                personHandler={addPerson} />
            <h2>Numbers</h2>
            <Numbers persons={personstoshow} />
        </div>
    )
}

export default App
