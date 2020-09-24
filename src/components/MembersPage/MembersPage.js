import React from "react";
import MemberProgress from "../MemberProgress/MemberProgress";
import Buttons from "./Buttons/Buttons";
import { getMembers } from "../../firebase/apiGet";
import { deleteUser } from "../../firebase/apiDelete";
import "./membersPage.scss";
import Preloader from "../common/Preloader/Preloader";
import MemberProfile from "../MemberProfile/MemberProfile";
import UserRegisterModal from "../Modals/Users/UserRegisterModal/UserRegisterModal";
import UserEditModal from "../Modals/Users/UserEditModal/UserEditModal";
import { RoleContext } from "../../RoleContext";

class MembersPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      members: null,
      activePage: "membersTable",
      activeUserId: null,
      activeUserName: null,
      memberProgressShow: null,
      showRegisterModal: false,
      showEditModal: false,
      reload: true
    };
  }

  componentDidMount() {
    const { role } = this.context;
    if (role === "admin") {
      this.getMembers();
    }
  }


  handleProgress = (userId, name) => () => {
    this.setState({
      activePage: "membersProgress",
      activeUserId: userId,
      activeUserName: name
    });
  };

  handleTasks = (userId, name) => () => {
    this.setState({
      activePage: "membersTasks",
      activeUserId: userId,
      activeUserName: name
    });

  };

  handleEdit = (userId) => () => {
    this.setState({
      showEditModal: true,
      activeUserId: userId
    });
  };

  handleDelete = (userId) => () => {
    deleteUser(userId).then((status) => {
      if (status === "OK") {
        this.reloadMembersPage();
      }
    });
  };

  handleReturnToFullList = () => {
    this.setState({
      activePage: "membersTable",
      activeUserId: null
    });
  };

  handleShowRegisterUserModal = () => {
    this.setState({
      showRegisterModal: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      showRegisterModal: false,
      showEditModal: false
    });
  };

  closeModalAndReload = () => {
    this.setState({
      showRegisterModal: false,
      showEditModal: false
    });
    this.handleCloseModal();
    this.reloadMembersPage();
  };

  reloadMembersPage = () => {
    this.setState({
      members: null,
      loading: true
    });
    this.getMembers();
  };

  showActivePage = (page) => {
    switch (page) {

      case "membersTable":
        return this.createMembersTable();

      case "membersProgress":
        return (
          <div>
            <MemberProgress userId={this.state.activeUserId}
                            handleReturnToFullList={this.handleReturnToFullList} />
          </div>
        );

      case "membersTasks":
        return (
          <div>
            <MemberProfile
              userId={this.state.activeUserId}
              userName={this.state.activeUserName}
              handleReturnToFullList={this.handleReturnToFullList}
            />
          </div>
        );
    }
  };

  getMembers = () => {
    getMembers().then((result) => {
      let members = result.map((member, i) => {
        return (
          <tr key={member.userId + "n"} className={i % 2 ? "darkLine" : "whiteLine"}>
            <td key={member.userId + "a"}>{i + 1}</td>
            <td key={member.userId + "b"}>
              <a href=''>{member.firstName + " " + member.lastName}</a>
            </td>
            <td key={member.userId + "c"}>{member.directionId}</td>
            <td key={member.userId + "d"}>{member.education}</td>
            <td key={member.userId + "i"}>{new Date(member.startDate).toLocaleDateString()}</td>
            <td key={member.userId + "j"}>{new Date(member.birthDate).toLocaleDateString()}</td>
            <td key={member.userId + "h"} className='memberButtons'>
              <Buttons
                userId={member.userId}
                handleProgress={this.handleProgress(member.userId, member.firstName)}
                handleTasks={this.handleTasks(member.userId, member.firstName)}
                handleEdit={this.handleEdit(member.userId)}
                handleDelete={this.handleDelete(member.userId)}
              />
            </td>
          </tr>
        );
      });

      if (!this.state.members) {
        this.setState({
          loading: false,
          members: members
        });
      }
    });
  };

  userRegisterModal = (modalState) => {
    if (modalState) {
      return (
        <UserRegisterModal closeModal={this.handleCloseModal}
                           closeModalAndReload={this.closeModalAndReload} />);
    } else return null;
  };

  userEditModal = (modalState) => {
    if (modalState) {
      return (
        <UserEditModal
          closeModal={this.handleCloseModal}
          userId={this.state.activeUserId}
          closeModalAndReload={this.closeModalAndReload}
        />
      );
    } else return null;
  };

  createMembersTable = () => {
    const tableHeaders = (
      <thead>
      <tr>
        <th>#</th>
        <th>Full Name</th>
        <th>Direction</th>
        <th>Education</th>
        <th>Start</th>
        <th>Age</th>
        <th />
      </tr>
      </thead>
    );

    return (
      <div>
        {this.userRegisterModal(this.state.showRegisterModal)}
        {this.userEditModal(this.state.showEditModal)}
        <button className='memberRegisterButton' onClick={this.handleShowRegisterUserModal}>
          Register
        </button>
        <table className='membersTable'>
          {tableHeaders}
          <tbody>{this.state.members}</tbody>
        </table>
      </div>
    );
  };


  render() {

    const { role, userId, signedUserName } = this.context;

    let admin = () => {
      return (
        <div>
          {this.userRegisterModal(this.state.showRegisterModal)}
          {this.userEditModal(this.state.showEditModal)}
          {this.state.loading ? <Preloader /> : this.showActivePage(this.state.activePage)}
        </div>
      );
    };

    let user = () => {
      return (
        <div>
          <MemberProfile userId={userId}
                         userName={signedUserName}
                         handleReturnToFullList={this.handleReturnToFullList} />
        </div>
      );
    };


    return (
      <div className='membersTableContainer'>
        {role === "admin" ? admin() : null}
        {role === "user" ? user() : null}
      </div>
    );
  }
}

MembersPage.contextType = RoleContext;

export default MembersPage;
