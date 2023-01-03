import Flex from "./Flex";
import {useState} from "react";
import ValueToggleButton from "./ValueToggleButton";
import blogsService from '../services/blogs'

const Blog = ({ blog }) => {

  const [ likes, setLikes ] = useState(blog.likes ? blog.likes : 0)
  const [ showFullContent, setShowFullContent ] = useState(false)

  const simpleContent = () =>
    <div>{ blog.title }</div>

  const fullContent = () =>
      <Flex customStyle={{
        flexDirection: 'column',
        gap: 10
      }}>
        <div>{ blog.title }</div>
        <div>{ blog.url }</div>
        <Flex customStyle={{
          flexDirection: 'row',
          gap: 10
        }}>
          { likes }
          <button onClick={ () => likeBlog(blog) }>like</button>
        </Flex>
        <div>{ blog.author }</div>
      </Flex>

  const likeBlog = async (blog) => {
    const newLikes = likes + 1
    setLikes(newLikes)
    blog.likes = newLikes

    await blogsService.updateBlog(blog)
  }

  const toggleContent = () =>
    setShowFullContent(!showFullContent)

  return (
    <Flex direction={'row'} customStyle={{
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid black',
      padding: '10px 16px 10px 16px'
    }}
    >
      { showFullContent ? fullContent() : simpleContent() }
      <ValueToggleButton labels={[ 'view', 'hide' ]} handleClick={ toggleContent }/>
    </Flex>
  )
}

export default Blog