import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const visibleStyle = {
    display: ''
  }

  const hiddenStyle = {
    display: 'none'
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={visible ? visibleStyle : hiddenStyle}>
        {props.children}
      </div>

      <button onClick={toggleVisibility}>
        {visible ? props.hideButton : props.showButton}
      </button>
    </div>
  )
})

Toggleable.propTypes = {
  hideButton: PropTypes.string.isRequired,
  showButton: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable