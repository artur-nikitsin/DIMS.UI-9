import React from 'react';
import Modal from '../Common/Modal';
import { getMember } from '../../../firebase/apiGet';
import UsersModalContent from '../Common/UsersModalContent';

class UserEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      loading: true,
    };
  }

  componentDidMount() {
    getMember(this.props.userId).then((result) => {
      this.setState({
        userData: result,
        loading: false,
      });
    });
  }

  render() {
    return (
      <Modal
        modalContent={<UsersModalContent userData={this.state.userData} />}
        loading={this.state.loading}
        modalType='Edit'
        closeModal={this.props.closeModal}
        userId={this.props.userId}
      />
    );
  }
}

export default UserEditModal;
