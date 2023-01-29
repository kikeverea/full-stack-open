import OpenLink from '../../icons/OpenLink'

const BlogTitle = ({ title, author, url }) => {
  return (
    <figure>
      <blockquote className='blockquote'>
        <h1>
          { title }
          <span><OpenLink link={ url }/></span>
        </h1>
      </blockquote>
      <figcaption className='blockquote-footer py-2'>
        <cite title='author'>added by { author }</cite>
      </figcaption>
    </figure>
  )
}

export default BlogTitle