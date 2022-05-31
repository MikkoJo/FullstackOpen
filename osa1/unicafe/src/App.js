/* eslint-disable react/prop-types */
import { useState } from 'react'

const StatisticLine = ({ text, value }) => <>{text} {value}<br/></>

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = () => good + neutral + bad
  const average = () => all() !== 0 ? (good - bad) / all() : 0
  const positive = () => all() !== 0 ? good / all() * 100 : 0
  if (all() === 0) {
    return <p>No feedback given!</p>
  }
  return (
    <div>
      <StatisticLine text='Good:' value={good} />
      <StatisticLine text='Neutral:' value={neutral} />
      <StatisticLine text='Bad:' value={bad} />
      <StatisticLine text='All:' value={all()} />
      <StatisticLine text='Average:' value={average()} />
      <StatisticLine text='Positive:' value={positive()} />
    </div>
  )
}

const Button = (props) => {
  const { text, handleClick } = props
  return <button onClick={handleClick}>{text}</button>
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
      <Button text='Good' handleClick={() => setGood(good + 1)} />
      <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='Bad' handleClick={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
