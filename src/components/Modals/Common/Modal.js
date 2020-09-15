import React from 'react';
import './modal.scss';
import Spinner from '../../common/Spinner/Spinner';

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
        <div className='closeModalArea' onClick={this.props.closeModal} />
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className='modalBody'>
            <button className='closeModalButton' onClick={this.props.closeModal}>
              x
            </button>
            {this.props.modalContent}
          </div>
        )}
      </div>
    );
  }
}

export default Modal;
