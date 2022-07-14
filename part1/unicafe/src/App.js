import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <FeedbackInput good={addGood} neutral={addNeutral} bad={addBad}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const FeedbackInput = ({good, neutral, bad}) => 
  <>
    <Button onclick={good} text="good" />
    <Button onclick={neutral} text="neutral" />
    <Button onclick={bad} text="bad" />
  </>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  
  if(total > 0) {
    const positivePercent = Math.round((good * 100) / total);
    const average = (total / 3).toFixed(1);
    return(
      <>
        <StatisticLine statistic="Good" value={good} />
        <StatisticLine statistic="Neutral" value={neutral} />
        <StatisticLine statistic="Bad" value={bad} />
        <StatisticLine statistic="All" value={total} />
        <StatisticLine statistic="Average" value={average} />
        <StatisticLine statistic="Positive" value={positivePercent ? (positivePercent + '%') : "0%"} />
      </>
    )
  }
  else {
    return(
      <>
      <p>No feedback given</p>
      </>
    )
  }
}

const StatisticLine = ({statistic, value}) => <p>{statistic}: {value}</p>

const Button = ({onclick, text}) => <button onClick={onclick}>{text}</button> 

export default App