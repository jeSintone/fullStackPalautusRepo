import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Person'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[filterValue, setFilterValue] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  console.log('render', persons.length, 'notes')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addToPhoneBook = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
          setNewName('')
          setNewNumber('')
      }
    }  
      
    else {
      const nameObject = {
      name: newName,
      number: newNumber,
    }
    personsService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    setNewName('')
    setNewNumber('')
    }
  }

  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const deleteHandler = (id) => {
    const deletedPerson = persons.find(p => p.id === id)
    if (window.confirm('Do you really want to delete ' + deletedPerson.name)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`The person was already deleted from the server`);
          setPersons(persons.filter(person => person.id !== id));
        })
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:  
        <Filter filterValue={filterValue} handleFilterChange={handleFilterChange}/>
      </div>
      <h3>add a new</h3>
      <PersonForm addToPhoneBook={addToPhoneBook}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ul>
        {numbersToShow.map(person => 
          <Persons key={person.id} person={person} deleteHandler={() => deleteHandler(person.id)}/>
        )}
      </ul>
    </div>
  )

}

export default App