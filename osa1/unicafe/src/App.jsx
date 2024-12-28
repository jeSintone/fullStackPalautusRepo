import { useState } from 'react'

const StatisticLine = ({text, value}) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }
  return (
  <table>
    <tbody>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={good + neutral + bad}/>
    <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)}/> 
    <StatisticLine text="positive" value={(good / (good + bad + neutral)) * 100 + "%"}/>
    </tbody>
  </table>
  )
}
const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
  <div>
    <Header text= "give feedback"/>
    <Button onClick={() => setGood(good + 1)} text="good"/>
    <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
    <Button onClick={() => setBad(bad + 1)} text="bad"/>
    <Header text="statistics"/>
    <Statistics good={good} neutral={neutral} bad={bad}/>
  </div>
  )
}

export default App