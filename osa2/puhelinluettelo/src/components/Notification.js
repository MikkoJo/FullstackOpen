import './notification.css'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  const messageClass = isError ? 'message error' : 'message'
  return <div className={messageClass}>{message}</div>
}

export default Notification
