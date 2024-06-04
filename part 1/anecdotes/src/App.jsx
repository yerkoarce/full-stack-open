import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState({
    votes: 0,
    index: 0
  })

  const handlerClickVote = () => {
    const copyOfPoints = [...points]
    copyOfPoints[selected] += 1
    setPoints(copyOfPoints)

    searchMostVoted()
  }

  const handlerClickSelectAnecdote = () => {
    setSelected(selected + 1)
    if (selected === (anecdotes.length - 1)) {
      setSelected(0)
    }
    searchMostVoted()
  }

  function searchMostVoted (){
    for (let i = 0; i < points.length; i++){
      if (points[i] > mostVoted.votes){
        setMostVoted({
          votes: points[i],
          index: i
        })
      }
    }
  }



  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <button onClick={handlerClickSelectAnecdote}>Next anecdote</button>
      <button onClick={handlerClickVote}>Vote</button>

      <h1>Anecdote whit most votes</h1>
      <p>{anecdotes[mostVoted.index]}</p>
      <p>Has {mostVoted.votes} votes</p>
    </div>
  )
}

export default App
