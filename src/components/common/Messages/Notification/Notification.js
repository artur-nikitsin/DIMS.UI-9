import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import './notification.scss';
import { connect } from 'react-redux';
import { hideNotification } from '../../../../redux/reducers/notificationReducer';
import { notificationTypes } from './notificationTypes';

class Notification extends React.PureComponent {
  render() {
    const { isShowed, notificationType, message, hideNotification } = this.props;

    if (isShowed) {
      setTimeout(hideNotification, 3000);
    }

    return isShowed ? (
      <Toast className='notification'>
        <ToastHeader icon={notificationTypes[notificationType].icon}>DIMS: {notificationType}</ToastHeader>
        <ToastBody>{message}</ToastBody>
      </Toast>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  const { isShowed, notificationType, message } = state.notifications;
  return {
    isShowed,
    notificationType,
    message,
  };
};

export default connect(mapStateToProps, {
  hideNotification,
})(Notification);
