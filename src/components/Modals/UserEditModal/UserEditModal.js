import React from "react";
import Modal from "../Common/Modal";
import { getMember } from "../../../firebase/apiGet";
import UsersModalDataWorker from "../Common/UsersModalDataWorker";
import { userModalTemplate } from "../Common/ModalInputsTemplate";

class UserEditModal extends React.PureComponent {
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

    const { userData, loading } = this.state;
    const { userId, closeModal, closeModalAndReload } = this.props;

    return (
      <Modal
        modalContent={
          <UsersModalDataWorker
            documentId={userId}
            modalTemplate={userModalTemplate}
            modalData={userData}
            modalType='Edit'
            closeModal={closeModal}
            closeModalAndReload={closeModalAndReload}
          />
        }
        loading={loading}
        closeModal={closeModal}
      />
    );
  }
}

export default UserEditModal;
