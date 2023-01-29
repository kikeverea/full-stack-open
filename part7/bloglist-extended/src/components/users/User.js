import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { editUser as updateEditedUser } from '../../reducers/usersReducer'
import { useState } from 'react'
import BlogsList from '../blogs/BlogsList'
import { Stack } from 'react-bootstrap'
import Edit from '../../icons/Edit'
import InputDialog from '../blogs/InputDialog'
import { showFailNotification } from '../../reducers/notificationReducer'

const User = () => {

  const id = useParams().id
  const dispatch = useDispatch()

  const [editUser, setEditUser] = useState(false)

  const user = useSelector(state =>
    state.users.find(user => user.id === id))

  const editUserName = (name) => {
    if (name) {
      dispatch(updateEditedUser({ ...user, name }))
    }
    else {
      dispatch(showFailNotification('Name required'))
    }

    setEditUser(false)
  }

  const cancelEdit = () =>
    setEditUser(false)

  return user ?
    <>
      <Stack direction='horizontal' style={{ justifyContent: 'space-between' }}>
        <h1>{ user.username }</h1>
        <Stack direction='horizontal' gap={ 3 } style={{ justifyContent: 'baseline' }}>
          <div className='lead'><i>{ user.name }</i></div>
          <Edit onClick={ () => setEditUser(true) }>edit</Edit>
        </Stack>
      </Stack>
      <InputDialog
        show={ editUser }
        value={ user.name }
        title='Edit User'
        subtitle='Name'
        buttonLabel='Save'
        maxLength={ 20 }
        onClose={ editUserName }
        onCancel={ cancelEdit } />

      <div className='py-4'>
        <h5 className='pb-2'>Blogs</h5>
        <BlogsList blogs={ user.blogs } />
      </div>
    </>
    : <Navigate replace to='/users'/>
}

export default User