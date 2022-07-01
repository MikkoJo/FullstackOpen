import { useState, useEffect } from 'react'
import personService from './services/persons'

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
        // Lots of copy-paste
        const updatedPerson = { ...existingPerson, number: newNumber}
        personService.update(updatedPerson)

        setNewName('')
        setNewNumber('')
        return
      }
      // alert(`${newName} is already added to phonebook`)
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // eslint-disable-next-line prettier/prettier
    personService.create(newPerson).then((returnedPerson) => {
      console.log('newPerson: ', returnedPerson)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
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
    console.log(event.target.value)
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
      })
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
