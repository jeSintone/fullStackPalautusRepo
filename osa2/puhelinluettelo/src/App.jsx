import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Person'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[filterValue, setFilterValue] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  
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
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
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
          <Persons key={person.id} person={person}/>
        )}
      </ul>
    </div>
  )

}

export default App