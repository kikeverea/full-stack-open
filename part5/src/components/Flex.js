const Flex = ({ direction, customStyle, className, children }) => {
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
    <div style={ style } className={ className ? className : '' }>
      { children }
    </div>
  )
}

export default Flex