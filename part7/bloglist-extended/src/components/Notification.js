import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification)
    return null

  const typeColor = notification.type === 'success' ? 'green' : 'red'

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    color: typeColor,
    borderColor: typeColor,
  }

  return (
    <div id="notification" style={ notificationStyle }>
      { notification.content }
    </div>
  )
}

export default Notification
