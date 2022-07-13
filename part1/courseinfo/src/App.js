const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises}/>
    </div>
  )
}

const Header = (props) => (
    <>
      <h1>{props.courseName}</h1>
    </>
)

const Content = (props) => (
  <>
    <Part part={props.parts[0]} exercise={props.exercises[0]}></Part>
    <Part part={props.parts[1]} exercise={props.exercises[1]}></Part>
    <Part part={props.parts[2]} exercise={props.exercises[2]}></Part>
  </>
)

const Part = (props) => (
  <>
    <p>{props.part} {props.exercise}</p>
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {addExercises(props.exercises)}</p>
  </>
)

const addExercises = (exercises) => (
  exercises.reduce((total, numOfExercises) => total + numOfExercises)

)

export default App