import PermissionHeaders from './PermissionHeaders';
import React from 'react';
import { Table } from 'reactstrap';
import BodyTable from './TableBody';
import { RolesPermissions } from './TableTemplates';
import './aboutPage.scss';

const AboutPage = ({ theme }) => {
  return (
    <div className='permissionsTableContainer'>
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
