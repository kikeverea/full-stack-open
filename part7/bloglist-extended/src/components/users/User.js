import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { FlexRow } from '../styled'

const User = () => {

  const id = useParams().id

  const user = useSelector(state =>
    state.users.find(user => user.id === id))

  return user ?
    <>
      <FlexRow style={{ alignItems: 'baseline' }}>
        <h1>{ user.name }</h1>
        <h3><i>{ user.username }</i></h3>
      </FlexRow>
      <h2>Added Blogs</h2>
      <ul>
        { user.blogs.map(blog =>
          <li key={ blog.id }>{ blog.title }</li>)
        }
      </ul>
    </>
    : <Navigate replace to='/users'/>
}

export default User