import Blog from "./Blog"

const BlogsTable = ({blogs}) => {
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
        { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
      </tbody>
    </table>
  )
}

export default BlogsTable