import {useState} from "react";

const HoverButton = ({ label, color, handleOnClick}) => {

  const buttonStyle = {
    borderRadius: 6,
    padding: '5px 10px 5px 10px',
    width: 60,
    textAlign: 'center'
  }

  const idleStyle = {
    ...buttonStyle,
    background: 'white',
    color: color,
    border: `1px solid ${ color }`
  }

  const hoverStyle = {
    ...buttonStyle,
    background: color,
    color: 'white',
    border: `1px solid ${ color }`,
    cursor: 'pointer'
  }

  const [style, setStyle] = useState(idleStyle)

  const handleOnMouseOver = () => {
    setStyle(hoverStyle)
  }

  const handleOnMouseOut = () => {
    setStyle(idleStyle)
  }

  return (
    <div style={ style }
         onMouseOver={ handleOnMouseOver }
         onMouseOut={ handleOnMouseOut }
         onClick={ handleOnClick }>
      { label }
    </div>
  )
}

export default HoverButton