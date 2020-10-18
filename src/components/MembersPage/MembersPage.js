import React from "react";
import MemberProgress from "../MemberProgress/MemberProgress";
import Buttons from "./Buttons/Buttons";
import { getMembers } from "../../firebase/apiGet";
import { deleteUser } from "../../firebase/apiDelete";
import "./membersPage.scss";
import { Button } from "reactstrap";
import Preloader from "../common/Preloader/Preloader";
import getLocaleDate from "../helpers/getLocaleDate/getLocalDate";
import { RoleContext } from "../../contexts/RoleContext";
import { Table } from "reactstrap";
import UserModal from "../Modals/User/UserModal";
import MemberTasks from "../MembersTasks/MemberTasks";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import isAdminOrMentor from "../common/Conditions/isAdminOrMentor";
import { ThemeContext } from "../../contexts/ThemeContext";


class MembersPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      members: null,
      activeUserId: null,
      activeUserName: null,
      modalIsOpen: false,
      modalType: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {

    const { role } = this.props;
    if (isAdminOrMentor(role)) {
      this.getMembers();
    } else {
      const { userId, signedUserName } = this.props;
      this.setState({
        activeUserId: userId,
        activeUserName: signedUserName
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getMembers();
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


  reloadMembersPage = () => {
    this.setState({
      members: null,
      loading: true
    });
    this.getMembers();
  };


  getMembers = () => {
    getMembers().then((result) => {

      const { role } = this.props;

      let members = result.map((member, i) => {
        return (
          <tr key={member.userId + "n"}>
            <td key={member.userId + "a"}>{i + 1}</td>
            <td key={member.userId + "b"}>
              <a href='' onClick={event => {
                event.preventDefault();
                this.openModal(member.userId, "view")();
              }}>{member.firstName + " " + member.lastName}</a>
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
                handleEdit={this.openModal(member.userId, "edit")}
                handleDelete={this.handleDelete(member.userId)} />
            </td>
          </tr>
        );
      });

      if (!this.state.members) {
        this.setState({
          loading: false,
          members
        });
      }
    });
  };


  openModal = (activeUserId, modalType) => () => {
    this.setState({
      modalIsOpen: true,
      activeUserId,
      modalType
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      activeUserId: null
    });
  };

  closeModalAndReload = () => {
    this.closeModal();
    this.reloadMembersPage();
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

    const { members, modalIsOpen, activeUserId, modalType } = this.state;
    const { theme } = this.context;
    const { role } = this.props;
    return (
      <div>
        <UserModal className={`${theme} userModal`}
                   buttonLabel="UserModal"
                   isOpen={modalIsOpen}
                   closeModal={this.closeModal}
                   userId={activeUserId}
                   modalType={modalType}
                   closeModalAndReload={this.closeModalAndReload} />

        {role === "mentor" ||
        <Button outline color={theme === "dark" ? "secondary" : "primary"} className='memberRegisterButton'
                onClick={this.openModal(null, "register")}>
          Register
        </Button>}

        <Table striped className={`${theme} membersTable`}>
          {tableHeaders}
          <tbody>{members}</tbody>
        </Table>
      </div>
    );
  };


  render() {

    const { loading, activeUserName } = this.state;

    return (
      <div className='membersTableContainer'>

        <Switch>
          <Route exact path={`/app/members`}>
            {loading ? <Preloader /> : this.createMembersTable()}
          </Route>

          <Route path={`/app/members/progress_user=:userId`}
                 render={(props) => <MemberProgress  {...props} />} />

          <RoleContext.Consumer>
            {({ role, userId, signedUserName }) => (
              <Route path={`/app/members/tasks_user=:userId`}
                     render={(props) =>
                       <MemberTasks role={role}
                                    userId={userId}
                                    signedUserName={signedUserName}
                                    {...props} />} />
            )}
          </RoleContext.Consumer>

        </Switch>
      </div>);
  }
}

MembersPage.propTypes = {
  match: PropTypes.object.isRequired
};

MembersPage.contextType = ThemeContext;
export default MembersPage;
