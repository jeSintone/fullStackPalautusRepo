import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addToPhoneBook = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: String(persons.length + 1)
    }
    console.log(nameObject)
    console.log(nameObject.name)
    console.log(persons)
    setPersons(persons.concat(nameObject))
    setNewName('')
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addToPhoneBook}>
          name: <input
          value={newName}
          onChange={handleNameChange} 
          />
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.id}>
            {person.name}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App