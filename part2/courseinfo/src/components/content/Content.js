import Part from './Part'
import Total from './Total'


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
      <Total total={course.countExercises()}/>
    </tfoot>
  </table>

  export default Content