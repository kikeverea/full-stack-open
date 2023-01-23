import { Link } from 'react-router-dom'
import { ListItem } from '../styled'

const BlogItem = ({ blog }) => {

  return (
    <ListItem>
      <Link to={ `/blogs/${ blog.id }` }>{ blog.title }</Link>
    </ListItem>
  )
}

export default BlogItem