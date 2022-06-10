import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  // console.log(person)
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </div>
)

const Filter = ({ filterCountry, handleFilterChange }) => (
  <div>
    <p>
      <label htmlFor='country'>Find countries</label>
      <input
        name='country'
        value={filterCountry}
        onChange={handleFilterChange}
      />
    </p>
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCountry, setfilterCountry] = useState('')

  const addName = (event) => {
    event.preventDefault()
    // console.log(event)
    if (persons.find((person) => person.name === newName)) {
      alert(` is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    console.log('newPerson: ', newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
    setfilterCountry(event.target.value)
  }

  const countriesToShow = () => {
    if (filterCountry === '') {
      return ''
    } else {
      return persons.filter((person) =>
        person.name
          .toLocaleLowerCase()
          .includes(filterCountry.toLocaleLowerCase())
      )
    }
  }

  return (
    <div>
      <h1>Country Information</h1>
      <Filter
        filterCountry={filterCountry}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow()} />
    </div>
  )
}

export default App
