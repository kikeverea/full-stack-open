const Notification = ({ notification }) =>
  notification ?
    <h3 style={{ padding: '16px 0 16p 0' }}>
      { notification }
    </h3>
    : null

export default Notification