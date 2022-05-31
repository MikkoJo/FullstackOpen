/* eslint-disable react/prop-types */
import { useState } from 'react'

const StatisticLine = ({ text, value, extra = '' }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{extra}</td>
  </tr>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const all = () => good + neutral + bad
  const average = () => all() !== 0 ? (good - bad) / all() : 0
  const positive = () => all() !== 0 ? good / all() * 100 : 0

  if (all() === 0) {
    return <p>No feedback given!</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='Good:' value={good} />
        <StatisticLine text='Neutral:' value={neutral} />
        <StatisticLine text='Bad:' value={bad} />
        <StatisticLine text='All:' value={all()} />
        <StatisticLine text='Average:' value={average().toFixed(1)} />
        <StatisticLine text='Positive:' value={positive().toFixed(1)} extra=' %' />
      </tbody>
    </table>
  )
}

const Button = (props) => {
  const { text, handleClick } = props
  return <button style={{ marginRight: 5 }} onClick={handleClick}>{text}</button>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
