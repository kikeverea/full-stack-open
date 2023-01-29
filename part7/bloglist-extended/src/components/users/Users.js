import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <>
      <h1 className='pb-4'>Users</h1>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          { users.map(user =>
            <tr key={ user.id }>
              <td>
                <Link to={ `/users/${ user.id }` }>{ user.name }</Link>
              </td>
              <td>{ user.username }</td>
              <td>{ user.blogs.length }</td>
            </tr>)
          }
        </tbody>
      </Table>
    </>
  )
}

export default Users