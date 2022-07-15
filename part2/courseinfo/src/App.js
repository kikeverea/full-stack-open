import Course from './components/Course'

const App = () => {
  const courses = 
  [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        }, 
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'One more part',
          exercises: 6,
          id: 4
        }
      ],
      countExercises: function () {
        return (this.parts.reduce((total, part) => total + part.exercises, 0))
      }
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        }, 
        {
          name: 'Middleware',
          exercises: 7,
          id: 2
        }
      ],
      countExercises: function () {
        return (this.parts.reduce((total, part) => total + part.exercises, 0))
      }
    },
    {
      id: 3,
      name: 'Easy-peasy course',
      parts: [
        {
          name: 'Lonely part',
          exercises: 1,
          id: 1
        }, 
      ],
      countExercises: function () {
        return (this.parts.reduce((total, part) => total + part.exercises, 0))
      }
    }    
  ]

  return (
    courses.map(course => 
      <Course key={course.id} course={course} />
    )
  )
}

export default App