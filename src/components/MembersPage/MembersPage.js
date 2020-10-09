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
import { Route } from "react-router-dom";


class MembersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      members: null,
      activeUserId: null,
      activeUserName: null,
      modalIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { role } = this.context;
    if (role === "admin" || role === "mentor") {
      this.getMembers();
    } else {
      const { userId, signedUserName } = this.context;
      this.setState({
        activeUserId: userId,
        activeUserName: signedUserName
      });
    }
  }


  getCurrentUser = (userId, name) => () => {
    this.setState({
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
                toProgress={`/app/members/progress_user=${member.userId}`}
                toTasks={`/app/members/tasks_user=${member.userId}`}
                userId={member.userId}
                handleProgress={this.getCurrentUser(member.userId, member.firstName)}
                handleTasks={this.getCurrentUser(member.userId, member.firstName)}
                handleEdit={this.openModal(member.userId)}
                handleDelete={this.handleDelete(member.userId)} />
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
                   reloadMemberPage={this.reloadMembersPage}/>
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

    const { loading, activeUserId, activeUserName } = this.state;

    return (
      <RoleContext.Consumer>{
        ({ role, userId }) => {
          return (
            <div className='membersTableContainer'>

              <Route exact path={`/app/members`}>
                {loading ? <Preloader /> : this.createMembersTable()}
              </Route>

              <Route path={`/app/members/progress_user=${activeUserId}`}>
                <MemberProgress userId={activeUserId} handleReturnToFullList={this.handleReturnToFullList} />
              </Route>

              <Route path={`/app/members/tasks_user=${activeUserId}`}>
                <MemberProfile userId={activeUserId}
                               userName={activeUserName}
                               handleReturnToFullList={this.handleReturnToFullList} />
              </Route>

            </div>);
        }}
      </RoleContext.Consumer>
    );
  }
}

MembersPage.contextType = RoleContext;

export default MembersPage;
