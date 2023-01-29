import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../reducers/usersReducer'
import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Users = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const loggedInUser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <>
      <h1 className='pb-4'>Users</h1>
      <Table hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          { users.map(user =>
            <LinkContainer key={ user.id } to={ `/users/${ user.id }` } style={{ cursor: 'pointer' }}>
              <tr>
                <td>{ user.name }</td>
                <td>{ user.username }</td>
                <td>{ user.blogs.length }</td>
                <td className='text-secondary'>
                  { loggedInUser.username === user.username
                    ? <em>logged in</em>
                    : '' }
                </td>
              </tr>
            </LinkContainer>)
          }
        </tbody>
      </Table>
    </>
  )
}

export default Users