import Flex from "./Flex";
import Blog from "./Blog";

import { useState } from "react";

const BlogsTable = ({ blogs }) => {

  const sortByLikes = (blogs) =>
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  const [sortedBlogs, setSortedBlogs] = useState(sortByLikes(blogs))

  const updateBlog = (blog) => {
    const blogIndex = sortedBlogs.findIndex(x => x.id === blog.id);
    sortedBlogs[blogIndex] = blog
    setSortedBlogs(sortByLikes([...sortedBlogs]))
  }

  return (
    <Flex customStyle={{ flexDirection: 'column', gap: 5, maxWidth: 480 }}>
      { sortedBlogs.map(blog =>
        <Blog key={ blog.id } blog={ blog } onBlogChange={ updateBlog }/>
      )}
    </Flex>
  )
}

export default BlogsTable