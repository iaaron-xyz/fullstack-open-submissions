const Notification = ({notification}) => {
  console.log(notification);
  
  if (notification.message === '') {
    return null;
  }
  
  return (
    <div className={notification.type}>{notification.message}</div>
  )
}
export default Notification