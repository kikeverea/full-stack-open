const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],
    countExercises: function () {
      return (this.parts.reduce((total, part) => total + part.exercises, 0))
    }
  }  

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total course={course}/>
    </div>
  )
}

const Header = (props) => (
    <>
      <h1>{props.course.name}</h1>
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
    <p>Number of exercises {props.course.countExercises()}</p>
  </>
)

export default App