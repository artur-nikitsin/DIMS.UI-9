import PermissionHeaders from './PermissionHeaders';
import React from 'react';
import { Table } from 'reactstrap';
import BodyTable from './TableBody';
import { RolesPermissions } from './TableTemplates';
import './aboutPage.scss';

const AboutPage = ({ theme }) => {
  return (
    <div className={`${theme} permissionsTableContainer`}>
      <div className={`${theme} dimsIntroduction`}>
        <h3>Welcome to DIMS!</h3>
        <p>
          We are glad to see you in the
          <b>'Dev Incubator Management System'</b> project or if shorter <b>DIMS</b>! From this moment, you are a member
          of a great development team. Here goes!
        </p>
        <p>
          This system allows you to manage tasks and members, track the progress of each task and each user. There are
          several user roles in the DIMS:
        </p>
        <ul>
          <li>
            The first one is <b>Admin</b>.
          </li>
          <li>
            The second one is the <b>Mentor</b>.
          </li>
          <li>
            The last one is the <b>Member</b>. It's just like you.
          </li>
        </ul>
        <h3>What can the roles do?</h3>
        <p>You can find information about it in next tables:</p>
      </div>
      <Table striped className={`${theme} permissionsTable`}>
        <PermissionHeaders role={'Admin'} />
        <tbody>{BodyTable(RolesPermissions, 'admin')}</tbody>
      </Table>
      <Table striped className={`${theme} permissionsTable`}>
        <PermissionHeaders role={'Mentor'} />
        <tbody>{BodyTable(RolesPermissions, 'mentor')}</tbody>
      </Table>
      <Table striped className={`${theme} permissionsTable`}>
        <PermissionHeaders role={'Member'} />
        <tbody>{BodyTable(RolesPermissions, 'user')}</tbody>
      </Table>
    </div>
  );
};

export default AboutPage;
