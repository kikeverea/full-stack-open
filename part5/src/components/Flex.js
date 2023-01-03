const Flex = ({ direction, customStyle, children }) => {
  let style = {
    display: 'flex',
    flexDirection: direction,
  }

  if (customStyle) {
    style = {
      ...style,
      ...customStyle
    }
  }

  return (
    <div style={ style }>
      { children }
    </div>
  )
}

export default Flex