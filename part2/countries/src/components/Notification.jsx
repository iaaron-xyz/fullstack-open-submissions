const Notification = ({ notificationInfo }) => {
  if (notificationInfo === null) {
    return null;
  }

  return (
    <div className={notificationInfo.class}>{notificationInfo.message}</div>
  );
};

export default Notification;
