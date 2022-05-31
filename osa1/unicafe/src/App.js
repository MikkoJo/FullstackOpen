/* eslint-disable react/prop-types */
import { useState } from 'react'

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = () => good + neutral + bad

  const average = () => all() !== 0 ? (good - bad) / all() : 0
  // const average = () => (good - bad) / all()

  const positive = () => all() !== 0 ? good / all() * 100 : 0

  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all()}</p>
      <p>Average: {average()}</p>
      <p>Positive: {positive()} %</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const all = () => good + neutral + bad

  // const average = () => (good - bad) / all()

  // const positive = () => good / all() * 100

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
      {/* <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all()}</p>
      <p>Average: {average()}</p>
      <p>Positive: {positive()} %</p> */}
    </div>
  )
}

export default App
