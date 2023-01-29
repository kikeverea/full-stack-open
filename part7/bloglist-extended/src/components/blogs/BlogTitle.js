import OpenLink from '../../icons/OpenLink'
import { Link } from 'react-router-dom'

const BlogTitle = ({ blog }) => {

  const formatUrl = url =>
    url.includes('http') ?
      url :
      `https://${ url }`

  return (
    <figure>
      <blockquote className='blockquote'>
        <h1>
          { blog.title }
          <span><OpenLink link={ formatUrl(blog.url) }/></span>
        </h1>
      </blockquote>
      <figcaption className='blockquote-footer py-2'>
        <cite title='author'>
          authored by <Link to={ `/users/${ blog.user.id }` }
            className='link-secondary'>
            { blog.author }
          </Link>
        </cite>
      </figcaption>
    </figure>
  )
}

export default BlogTitle