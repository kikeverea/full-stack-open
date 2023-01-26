import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { FlexRow } from '../styled'
import EditUserForm from './EditUserForm'
import { editUser as updateEditedUser } from '../../reducers/usersReducer'
import { useState } from 'react'

const User = () => {

  const [editUser, setEditUser] = useState(false)

  const id = useParams().id
  const dispatch = useDispatch()

  const user = useSelector(state =>
    state.users.find(user => user.id === id))

  const updateUser = (updatedUser) => {
    dispatch(updateEditedUser(updatedUser))
    setEditUser(false)
  }

  const cancelEdit = () =>
    setEditUser(false)

  return user ?
    <>
      <FlexRow style={{ alignItems: 'baseline' }}>
        <h1>{ user.name }</h1>
        <h3><i>{ user.username }</i></h3>
        <button onClick={ () => setEditUser(true) }>edit</button>
      </FlexRow>
      { editUser ? <EditUserForm user={ user } onFormSubmit={ updateUser } onCancel={ cancelEdit }/> : null }
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