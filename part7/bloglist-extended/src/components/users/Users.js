import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../reducers/usersReducer'

import { TableHeader } from '../styled'
import { TableColumn } from '../styled'
import { Link } from 'react-router-dom'

const Users = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <TableHeader>User Name</TableHeader>
            <TableHeader>Blogs Created</TableHeader>
          </tr>
        </thead>
        <tbody>
          { users.map(user =>
            <tr key={ user.id } align='center'>
              <TableColumn>
                <Link to={ `/users/${ user.id }` }>{ user.name }</Link>
              </TableColumn>
              <TableColumn>{ user.blogs.length }</TableColumn>
            </tr>)
          }
        </tbody>
      </table>
    </>
  )
}

export default Users