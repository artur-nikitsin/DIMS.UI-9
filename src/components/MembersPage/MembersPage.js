import React from "react";
import MemberProgress from "../MemberProgress/MemberProgress";
import Buttons from "./Buttons/Buttons";
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
import { connect } from "react-redux";
import {
  closeModal,
  getAllMembers, openModal
} from "../../redux/reducers/membersReducer";


class MembersPage extends React.Component {

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { getAllMembers } = this.props;
    getAllMembers();
  }


  handleDelete = (userId) => () => {
    deleteUser(userId).then(() => {
      this.reloadMembersPage();
    });
  };


  reloadMembersPage = () => {
    const { getAllMembers } = this.props;
    getAllMembers();
  };

  membersTable() {
    const { members } = this.props;
    let table = [];
    table = members.map((member, i) => {
      return (
        <tr key={member.userId + "n"}>
          <td key={member.userId + "a"}>{i + 1}</td>
          <td key={member.userId + "b"}>
            <Button color="link" onClick={event => {
              event.preventDefault();
              this.openModal(member.userId, "view")();
            }}>{member.firstName + " " + member.lastName}</Button>
          </td>
          <td key={member.userId + "c"}>{member.directionId}</td>
          <td key={member.userId + "d"}>{member.education}</td>
          <td key={member.userId + "i"}>{getLocaleDate(member.startDate)}</td>
          <td key={member.userId + "j"}>{getLocaleDate(member.birthDate)}</td>
          <td key={member.userId + "h"} className='memberButtons'>
            <Buttons
              toProgress={`/app/members/progress_user=${member.userId}`}
              toTasks={`/app/members/tasks_user=${member.userId}`}
              userId={member.userId}
              handleEdit={this.openModal(member.userId, "edit")}
              handleDelete={this.handleDelete(member.userId)} />
          </td>
        </tr>
      );
    });
    return table;
  };


  openModal = (activeUserId, modalType) => () => {
    const { openModal } = this.props;
    openModal(activeUserId, modalType);
  };

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
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

    const { role, theme, modalIsOpen, activeUserId, modalType } = this.props;

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
          <tbody>{this.membersTable()}</tbody>
        </Table>
      </div>
    );
  };


  render() {
    const { loading } = this.props;
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


const mapStateToProps = (state) => {
  const {
    members,
    loading,
    activeUserId,
    activeUserName,
    modalIsOpen,
    modalType
  } = state.members;
  return {
    members,
    loading,
    activeUserId,
    activeUserName,
    modalIsOpen,
    modalType
  };
};


MembersPage.propTypes = {
  match: PropTypes.object.isRequired,
  members: PropTypes.array
};


export default connect(mapStateToProps, {
  getAllMembers,
  openModal,
  closeModal
})(MembersPage);


