import React from "react";
import MemberProgress from "../MemberProgress/MemberProgress";
import Buttons from "./Buttons/Buttons";
import { getMembers } from "../../firebase/apiGet";
import { deleteUser } from "../../firebase/apiDelete";
import "./membersPage.scss";
import { Button } from "reactstrap";
import Preloader from "../common/Preloader/Preloader";
import MemberProfile from "../MemberProfile/MemberProfile";
import getLocaleDate from "../helpers/getLocaleDate/getLocalDate";
import { RoleContext } from "../../RoleContext";
import { Table } from "reactstrap";
import UserModal from "../Modals/User/UserModal";


class MembersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      members: null,
      activePage: "membersTable",
      activeUserId: null,
      activeUserName: null,
      memberProgressShow: null,
      reload: true,
      modalIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { role } = this.context;
    if (role === "admin" || role === "mentor") {
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


  handleDelete = (userId) => () => {
    deleteUser(userId).then(() => {
      this.reloadMembersPage();
    });
  };

  handleReturnToFullList = () => {
    this.setState({
      activePage: "membersTable",
      activeUserId: null
    });
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
            <MemberProgress userId={this.state.activeUserId} handleReturnToFullList={this.handleReturnToFullList} />
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
      const { role } = this.context;

      let members = result.map((member, i) => {
        return (
          <tr key={member.userId + "n"} className={i % 2 ? "darkLine" : "whiteLine"}>
            <td key={member.userId + "a"}>{i + 1}</td>
            <td key={member.userId + "b"}>
              <a href=''>{member.firstName + " " + member.lastName}</a>
            </td>
            <td key={member.userId + "c"}>{member.directionId}</td>
            <td key={member.userId + "d"}>{member.education}</td>
            <td key={member.userId + "i"}>{getLocaleDate(member.startDate)}</td>
            <td key={member.userId + "j"}>{getLocaleDate(member.birthDate)}</td>


            <td key={member.userId + "h"} className='memberButtons'>
              <Buttons
                role={role}
                userId={member.userId}
                handleProgress={this.handleProgress(member.userId, member.firstName)}
                handleTasks={this.handleTasks(member.userId, member.firstName)}
                handleEdit={this.openModal(member.userId)}
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


  openModal = (userId) => () => {
    this.setState({
      modalIsOpen: true,
      activeUserId: userId
    });
  };

  closeModal = (userId) => {
    this.setState({
      modalIsOpen: false,
      activeUserId: userId
    });
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

    const { members, modalIsOpen, activeUserId } = this.state;
    return (
      <div>
        <UserModal className="userModal"
                   buttonLabel="UserModal"
                   isOpen={modalIsOpen}
                   closeModal={this.closeModal}
                   userId={activeUserId}
                   reloadMemberPage={this.reloadMembersPage}
        />
        <Button outline color="primary" className='memberRegisterButton' onClick={this.openModal(null)}>
          Register
        </Button>
        <Table striped className='membersTable'>
          {tableHeaders}
          <tbody>{members}</tbody>
        </Table>
      </div>
    );
  };


  render() {

    const { role, userId, signedUserName } = this.context;

    const { showRegisterModal, showEditModal, loading, activePage } = this.state;

    let admin = () => {
      return (
        <div>
          {loading ? <Preloader /> : this.showActivePage(activePage)}
        </div>
      );
    };

    let user = (userId) => {
      return (
        <div>
          <MemberProfile userId={userId}
                         userName={signedUserName}
                         handleReturnToFullList={this.handleReturnToFullList} />
        </div>
      );
    };


    return (
      <RoleContext.Consumer>{
        ({ role, userId }) => {
          return (
            <div className='membersTableContainer'>
              {(role === "admin" || role === "mentor") ? admin() : user(userId)}
            </div>);
        }}
      </RoleContext.Consumer>
    );
  }
}

MembersPage.contextType = RoleContext;

export default MembersPage;
