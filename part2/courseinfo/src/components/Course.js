import Header from './Header' 
import Content from './content/Content' 

const Course = ({course}) =>
    <>
        <Header name={course.name} />
        <Content course={course} />
    </>
export default Course