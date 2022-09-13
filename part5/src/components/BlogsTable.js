import Blog from "./Blog"

const BlogsTable = (user) => {
  return (
    <table>
      <thead>
        <tr>
          <th align='left'>Title</th>
          <th />
          <th align='left'>Author</th>
        </tr>
      </thead>
      <tbody>
        { user.blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
      </tbody>
    </table>
  )
}

export default BlogsTable