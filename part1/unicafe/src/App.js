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
      <FeedbackInput good={addGood} neutral={addNeutral} bad={addBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const FeedbackInput = ({good, neutral, bad}) => 
  <>
    <h1>Give Feedback</h1>
    <Button onclick={good} text="good" />
    <Button onclick={neutral} text="neutral" />
    <Button onclick={bad} text="bad" />
  </>

const Statistics = ({good, neutral, bad}) =>
  <>
    <h1>Statistics</h1>
    <p>Good: {good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
  </>

const Button = ({onclick, text}) => <button onClick={onclick}>{text}</button> 

export default App