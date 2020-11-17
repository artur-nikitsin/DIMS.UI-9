import React from 'react';

function PermissionHeaders({ role }) {
  return (
    <thead>
      <tr>
        <th>Actions</th>
        <th>{role}</th>
      </tr>
    </thead>
  );
}

export default PermissionHeaders;
