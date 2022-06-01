import { useState } from 'react'

const Button = ({ text, handleClick }) => <button
              style={{ marginRight: 5 }}
              onClick={handleClick}>
              {text}
              </button>

const MostVoted = (props) => {
  const { anecdotes, mostVoted } = props
  return (
    <div>
    {mostVoted.map((vote, index) => (
      <p key={index}>{anecdotes[vote]}</p>
    ))}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const getNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const getMostVoted = () => {
    const max = Math.max(...points)
    const maxInd = []
    points.forEach((points, ind) => {
      if (points === max) {
        maxInd.push(ind)
      }
    })
    return maxInd
  }
  const mostVoted = getMostVoted()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p>Has {points[selected]} votes.</p>
      <Button text='Vote' handleClick={vote} />
      <Button text='Next anecdote' handleClick={getNext} />
      <h1>{mostVoted.length < 2 ? 'Anecdote' : 'Anecdotes'} with most votes</h1>
      <MostVoted anecdotes={anecdotes} mostVoted={mostVoted} />
    </div>
  )
}

export default App
