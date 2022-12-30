import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  return (
    <div className={`notification ${notification.class}`}>
      <p>{notification.message}</p>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
}

export default Notification
