import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loggedInUserReducer'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavigationBar = () => {

  const loggedInUser = useSelector(state => state.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Nav className='me-auto'>
          <LinkContainer to='/blogs'>
            <Nav.Link>
              Blogs
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/users'>
            <Nav.Link>
              Users
            </Nav.Link>
          </LinkContainer>
        </Nav>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            signed in:
          </Navbar.Text>
          <Nav>
            <LinkContainer to={ `/users/${ loggedInUser.id }` }>
              <Nav.Link>
                { loggedInUser.name }
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Button variant='outline-light' size='sm' className='mx-2' onClick={ logout }>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar