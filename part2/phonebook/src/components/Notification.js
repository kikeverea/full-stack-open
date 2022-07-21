const Notification = ({notification}) => {
  const notificationStyle = () => {
    return {
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      marginTop: '16px',
      marginRight: '16px'
    }
  }

  const positiveStyle = {
    ...notificationStyle(),
    color: 'green'
  }
  
  const errorStyle = {
    ...notificationStyle(),
    color: 'red'
  }

  if (notification === null) {
    return null
  }

  return (
    <div style={notification.type === 'success' ? positiveStyle : errorStyle}>
      {notification.message}
    </div>
  )
}

export default Notification