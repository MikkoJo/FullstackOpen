import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Person = ({ person, handleDeleteClick }) => {
  // console.log(person)
  return (
    <p>
      {person.name} {person.number}&nbsp;
      <button
        type='button'
        value={person.id}
        onClick={handleDeleteClick}
        name={person.name}
      >
        Delete
      </button>
    </p>
  )
}

const Persons = ({ persons, handleDeleteClick }) => (
  <div>
    {persons.map((person) => (
      <Person
        key={person.id}
        person={person}
        handleDeleteClick={handleDeleteClick}
      />
    ))}
  </div>
)

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number:
      <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

const Filter = ({ filterName, handleFilterChange }) => (
  <div>
    <h3>filter shown with</h3>
    <input value={filterName} onChange={handleFilterChange} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' },
  // ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    // console.log(event)
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : updatedPerson
              )
            )
            setMessage(`Updated ${updatedPerson.name}`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(() => {
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            )
            setIsError(true)
            setMessage(`${updatedPerson.name} is already removed from server`)
            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // eslint-disable-next-line prettier/prettier
    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => setMessage(null), 5000)
    })
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDeleteClick = (event) => {
    // console.log(event.target.value)
    if (window.confirm(`Delete ${event.target.name} ?`)) {
      // eslint-disable-next-line prettier/prettier
      personService
        .remove(event.target.value)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== +event.target.value)
          )
          setMessage(`${event.target.name} is removed from phoneBook`)
        })
        .catch(() => {
          setPersons(
            persons.filter((person) => person.id !== +event.target.value)
          )
          setIsError(true)
          setMessage(`${event.target.name} is already removed from server`)
        })
      setTimeout(() => {
        setMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const personsToShow = () => {
    if (filterName === '') {
      return persons
    } else {
      return persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow()}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default App
