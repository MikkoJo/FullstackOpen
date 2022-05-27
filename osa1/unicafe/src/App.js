import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button>Good</button>
      <button>Neutral</button>
      <button>Bad</button>
      <h1>Statistics</h1>
      <p>Good: </p>
      <p>Neutral: </p>
      <p>Bad: </p>
    </div>
  )
}

export default App
