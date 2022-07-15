import Part from './Part'
import Total from './Total'

const countCourseExercises= (courseParts) => 
  courseParts.reduce((total, part) => total + part.exercises, 0)

const Content = ({course}) => 
  <table>
    <tbody>
      {course.parts.map(part => 
          <Part key={part.id} 
                name={part.name} 
                exercises={part.exercises} />)
      }
    </tbody>
    <tfoot>
      <Total total={countCourseExercises(course.parts)}/>
    </tfoot>
  </table>

  export default Content