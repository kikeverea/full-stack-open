import { FlexRow, FlexSpacedRow } from './styled'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loggedInUserReducer'

const NavigationBar = () => {

  const loggedInUser = useSelector(state => state.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <FlexSpacedRow style={{ background: 'rgb(130, 210, 240)' }}>
      <FlexRow>
        <Link to='/blogs'>blogs</Link>
        <Link to='/users'>users</Link>
      </FlexRow>
      <FlexRow>
        { loggedInUser.name }
        <button onClick={ logout }>Logout</button>
      </FlexRow>
    </FlexSpacedRow>
  )
}

export default NavigationBar