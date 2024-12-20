import { useState, useEffect } from 'react'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [messageError, setMessageError] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)

  // Obtención de los datos del servidor
  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        console.log('Persoons Fetched', persons)
        setPersons(persons)
      })
      .catch(error => { 
        console.log('Error fetching persons', error)
      })
  }, [])


  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    // Busca si el nombre en personObject es parte de las personas agregadas
    const findName = persons.find(person => person.name === personObject.name) 
    console.log('Find name', findName)
    if(findName){
      if ( window.confirm(`${findName.name} is already added to phonebook, replace the old number with a new one?`)){
        const personObjectToUpdate = {...findName, number: personObject.number}
        personsService
          .update(findName.id, personObjectToUpdate)
          .then(updatePerson => {
            setMessageSuccess(`${updatePerson.name}'s number was updated`)
            setTimeout(()=> {
              setMessageSuccess(null)
            }, 3000)
            setPersons(persons.map(person => person.id !== findName.id ? person : updatePerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessageError(`Information of ${personObject.name} has already been removed from server`)
            setTimeout(()=> {
              setMessageError(null)
            }, 3000)
          })
      }
  } else {
    personsService
          .create(personObject)
          .then(returnedPerson => {
            setMessageSuccess(`${returnedPerson.name} added to phonebook`)
            setTimeout(()=> {
              setMessageSuccess(null)
            }, 3000)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log('Error creating person', error)
          })  
  }}

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

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (!personToDelete) {
      setMessageError('person not found')
      setTimeout(() => {
        setMessageError(null)
      }, 3000)
      return
    }

    if (window.confirm(`Delete ${personToDelete.name}?`)){
      personsService
        .deletePerson(id)
        .then(deletePerson => {
          setPersons(persons.filter(person => person.id !== id))
          setMessageError(`${personToDelete.name} is deleted from server`)
          setTimeout(()=> {
            setMessageError(null)
          }, 3000)
        }
        
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
          filterName={filterName}
          handleFilter={handleFilter}
        />
      <h2>Add a new</h2>
      <NotificationError message={messageError}/>
      <NotificationSuccess message={messageSuccess}/>
      <PersonForm 
          addPerson={addPerson}
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}
      />
      <PersonsList 
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App

const Person = ({ name, number, handleDeletePerson }) => {
  return (
    <li>
      <span>{name}: {number}</span>
      <button onClick={handleDeletePerson}>Delete</button>
    </li>
  )
}

const NotificationError = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const NotificationSuccess = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
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
  handleNewNumber,
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

const PersonsList = ({ personsToShow, handleDeletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(person => {
        return (
            <Person
              key={person.id}
              name={person.name}
              number={person.number}
              handleDeletePerson={() => handleDeletePerson(person.id)}
            />
        )
      })}
    </div>
  )
}