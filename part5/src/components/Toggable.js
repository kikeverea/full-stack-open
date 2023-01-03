import {forwardRef, useImperativeHandle, useState} from "react";

const Toggable = forwardRef((props, refs) => {

  const [active, setActive] = useState(false)

  const showWhenActive = {
    display: active ? '' : 'none'
  }

  const hideWhenActive = {
    display: active ? 'none' : ''
  }

  const toggle = () =>
    setActive(!active)

  useImperativeHandle(refs, () => {
    return {
      toggle
    }
  })

  return (
    <div style={{ padding: '20px 0 20px 0'}}>
      <div style={ hideWhenActive }>
        <button onClick={ toggle }>{ props.label }</button>
      </div>
      <div style={ showWhenActive }>
        { props.children }
      </div>
    </div>
  )
})

export default Toggable