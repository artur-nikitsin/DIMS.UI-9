import React from 'react';
import './modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegisterModal: false,
    };
  }

  render() {
    return (
      <div className='modal'>
        <div className='modalBody'>
          <button className='closeModalButton' onClick={this.props.closeModal}>
            Close
          </button>
          {this.props.modalContent}
          <button className='userRegisterButton'>{this.props.modalType}</button>
        </div>
      </div>
    );
  }
}

export default Modal;
