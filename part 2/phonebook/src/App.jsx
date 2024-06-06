import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  // Obtención de los datos del servidor
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(Response => {
        setPersons(Response.data)
      })
  }, [])
  

  const addPerson = (e) => {
    e.preventDefault()
    const presonObject = {
      name: newName,
      number: newNumber
    }
    // Busca si el nombre en personObject es parte de las personas agregadas
    const findName = persons.find(person => person.name === presonObject.name) 
    if(findName){
      alert(`${findName.name} Ya está registrado`)
    } else {
      setPersons(persons.concat(presonObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const personsToShow = filterName === '' ? 
    persons :
    persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilterName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
          filterName={filterName}
          handleFilter={handleFilter}
        />
      <h2>Add a new</h2>
      <PersonForm 
          addPerson={addPerson}
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}
      />
      <PersonsList 
        personsToShow={personsToShow}
      />
    </div>
  )
}

export default App

const Person = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const Filter = ({ filterName, handleFilter }) => {

  return (
    <>
      <label htmlFor="filter">Filter by name: </label>
      <input 
        type="text"
        value={filterName}
        onChange={handleFilter}
      />
    </>
  )
}

const PersonForm = ({ 
  addPerson, 
  newName, 
  handleNewName, 
  newNumber, 
  handleNewNumber 
}) => {

  return (
    <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">Name: </label>
          <input 
            id='name'
            value={newName} 
            onChange={handleNewName}
          />
          <br />
          <label htmlFor="number">Number: </label>
          <input type="text"
            id='number'
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const PersonsList = ({ personsToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(person => {
        return (
          <Person 
          key={person.name}
          name={person.name}
          number={person.number}
        />
        )
      })}
    </div>
  )
}