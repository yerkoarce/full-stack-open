import { useState } from 'react'

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral
  const average = 
    all === 0 ? 0
    : (good - bad)/ all;
  const positive = 
    all === 0 ? 0
    : (good/all)*100
  return (
    <div>
      <h2>Statistics</h2>
      {all === 0 ? 
      <p>No feedback given</p>
      :       
      <table>
        <tbody>
        <StatisticLine text='Good' statistic={good} />
        <StatisticLine text='Neutral' statistic={neutral} />
        <StatisticLine text='Bad' statistic={bad} />
        <StatisticLine text='All votes' statistic={all} />
        <StatisticLine text='Average' statistic={average} />
        <StatisticLine text='Positive' statistic={positive} />
        </tbody>
      </table>
    }
    </div>
  )
}

const StatisticLine = ({ text, statistic }) => {

  return (
    <tr>
      <th>{text}</th>
      <td>{statistic}</td>
    </tr>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>Give feedback</h1>
      <Button text='Good' handleClick={() => setGood(good + 1)}/>
      <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='Bad' handleClick={() => setBad(bad + 1)}/>
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
      />
    </div>
  )
}

export default App

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}