import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BlogsList = ({ blogs }) => {

  const navigate = useNavigate()

  return (
    <>
      { blogs ?
        <ListGroup>
          { blogs.map(blog =>
            <ListGroup.Item action onClick={() => navigate(`/blogs/${ blog.id }`)} key={ blog.id }>
              { blog.title }
            </ListGroup.Item>
          )}
        </ListGroup>
        :
        'No blogs listed' }
    </>
  )
}

export default BlogsList