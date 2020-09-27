import React from "react";
import Modal from "../Common/Modal";
import { getMember } from "../../../firebase/apiGet";
import UsersModalDataWorker from "../Common/UsersModalDataWorker";
import { userModalTemplate } from "../Common/ModalInputsTemplate";

class UserEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      loading: true
    };
  }

  componentDidMount() {


    if (this.props.userId) {
      getMember(this.props.userId).then((result) => {
        this.setState({
          userData: result,
          loading: false
        });
      });
    } else {
      this.state = {
        userData: null,
        loading: false
      };
    }

  }


  render() {
    return (
      <Modal
        modalContent={
          <UsersModalDataWorker
            documentId={this.props.userId}
            modalTemplate={userModalTemplate}
            modalData={this.state.userData}
            modalType='Edit'
            closeModal={this.props.closeModal}
            closeModalAndReload={this.props.closeModalAndReload}
          />
        }
        loading={this.state.loading}
        closeModal={this.props.closeModal}
        userId={this.props.userId}
      />
    );
  }
}

export default UserEditModal;
