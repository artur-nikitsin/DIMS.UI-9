import React from 'react';
import PropTypes from 'prop-types';
import { PermissionClasses } from './TableTemplates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const TableBody = (arr, member) =>
  arr.map((item, i) => {
    return (
      <tr key={i}>
        <td className='permissionName'>{item.permission}</td>
        <td className={PermissionClasses[item[member]]}>
          {<FontAwesomeIcon size='sm' icon={item[member] === '+' ? faPlus : faMinus} />}
        </td>
      </tr>
    );
  });

TableBody.propTypes = {
  arr: PropTypes.array,
};

export default TableBody;
