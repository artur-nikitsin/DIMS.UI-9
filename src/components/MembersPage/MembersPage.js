import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import Buttons from './Buttons/Buttons';
import { deleteUser } from '../../firebase/apiDelete';
import './membersPage.scss';
import Preloader from '../common/Preloader/Preloader';
import getLocaleDate from '../helpers/getLocaleDate/getLocalDate';
import UserModal from '../Modals/User/UserModal';
import { closeModal, getAllMembers, openModal } from '../../redux/reducers/membersReducer';
import getThemeColor from '../helpers/getThemeColor/getThemeColor';
import getDirectionName from '../helpers/getDirectionName/getDirectionName';
import getAge from '../helpers/getAge/getAge';
import NoDataMessage from '../common/Messages/NoDataMessage/NoDataMessage';

class MembersPage extends React.PureComponent {
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
          <th className='collapsed'>Direction</th>
          <th className='collapsed'>Education</th>
          <th className='collapsed'>Start</th>
          <th className='collapsed'>Age</th>
          <th className='minRow'> Information</th>
          <th />
        </tr>
      </thead>
    );

    const { role, theme, modalIsOpen, activeUserId, modalType } = this.props;

    return (
      <>
        <UserModal
          className={`${theme} userModal`}
          buttonLabel='UserModal'
          isOpen={modalIsOpen}
          closeModal={this.closeModal}
          userId={activeUserId}
          modalType={modalType}
          closeModalAndReload={this.closeModalAndReload}
        />

        {role === 'mentor' || (
          <Button
            outline
            color={getThemeColor(theme)}
            className='memberRegisterButton'
            onClick={this.openModal(null, 'register')}
          >
            Register
          </Button>
        )}

        {this.membersTable().length ? (
          <Table striped className={`${theme} membersTable`}>
            {tableHeaders}
            <tbody>{this.membersTable()}</tbody>
          </Table>
        ) : (
          <NoDataMessage text='Nothing to show. You can register first user' />
        )}
      </>
    );
  };

  membersTable() {
    const { members, directions } = this.props;
    const table = members.map((member, i) => {
      return (
        <tr key={`${member.userId}n`}>
          <td key={`${member.userId}a`}>{i + 1}</td>
          <td key={`${member.userId}b`}>
            <Button color='link' onClick={this.openModal(member.userId, 'view')}>
              {`${member.firstName} ${member.lastName}`}
            </Button>
          </td>
          <td key={`${member.userId}c`} className='collapsed'>
            {getDirectionName(directions, member.directionId)}
          </td>
          <td key={`${member.userId}d`} className='collapsed'>
            {member.education}
          </td>
          <td key={`${member.userId}i`} className='collapsed'>
            {getLocaleDate(member.startDate)}
          </td>
          <td key={`${member.userId}j`} className='collapsed'>
            {getAge(member.birthDate)}
          </td>
          <td className='minRow'>
            <ul className='tableInfo'>
              <li>{`Direction: ${getDirectionName(directions, member.directionId)}`}</li>
              <hr />
              <li>{`Start date: ${getLocaleDate(member.startDate)}`}</li>
              <hr />
              <li>{`Age: ${getAge(member.birthDate)}`}</li>
            </ul>
          </td>
          <td key={`${member.userId}h`} className='memberButtons'>
            <Buttons
              toProgress={`/users/${member.userId}/progress`}
              toTasks={`/users/${member.userId}/tasks`}
              userId={member.userId}
              handleEdit={this.openModal(member.userId, 'edit')}
              handleDelete={this.handleDelete(member.userId)}
            />
          </td>
        </tr>
      );
    });
    return table;
  }

  render() {
    const { loading } = this.props;
    return <div className='membersTableContainer'>{loading ? <Preloader /> : this.createMembersTable()}</div>;
  }
}

const mapStateToProps = (state) => {
  const { members, directions, loading, activeUserId, activeUserName, modalIsOpen, modalType } = state.members;
  return {
    members,
    directions,
    loading,
    activeUserId,
    activeUserName,
    modalIsOpen,
    modalType,
  };
};

MembersPage.propTypes = {
  members: PropTypes.array,
  getAllMembers: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  loading: PropTypes.bool,
  role: PropTypes.string,
  theme: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  activeUserId: PropTypes.string,
  modalType: PropTypes.string,
};

MembersPage.defaultProps = {
  members: [],
  getAllMembers: null,
  openModal: null,
  closeModal: null,
  loading: false,
  role: '',
  theme: 'light',
  modalIsOpen: false,
  activeUserId: '',
  modalType: 'view',
};

export default connect(mapStateToProps, {
  getAllMembers,
  openModal,
  closeModal,
})(MembersPage);
