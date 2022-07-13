const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  const parts = [part1, part2, part3]

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
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
    <Part part={props.parts[0].name} exercise={props.parts[0].exercises}></Part>
    <Part part={props.parts[1].name} exercise={props.parts[1].exercises}></Part>
    <Part part={props.parts[2].name} exercise={props.parts[2].exercises}></Part>
  </>
)

const Part = (props) => (
  <>
    <p>{props.part} {props.exercise}</p>
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {sumExercises(props.parts)}</p>
  </>
)

const sumExercises = (exercises) => (
  exercises.reduce((total, part) => total + part.exercises, 0)
)

export default App