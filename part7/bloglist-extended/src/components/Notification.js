import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification)
    return null

  const variant = notification.type === 'success' ? 'success' : 'danger'

  return (
    <Alert id="notification" variant={ variant }>
      { notification.content }
    </Alert>
  )
}

export default Notification
