import Flex from "./Flex";
import Blog from "./Blog";

const BlogsTable = ({ blogs }) => {

  return (
    <Flex customStyle={{ flexDirection: 'column', gap: 5, maxWidth: 480 }}>
      { blogs.map(blog =>
        <Blog key={ blog.id } blog={ blog }/>
      )}
    </Flex>
  )
}

export default BlogsTable