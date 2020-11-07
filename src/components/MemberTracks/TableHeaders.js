import React from 'react';

function TableTrackHeaders() {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Task</th>
        <th className='collapsed'>Note</th>
        <th className='collapsed'>Date</th>
        <th className='minRow'> Information</th>
        <th />
      </tr>
    </thead>
  );
}

export default TableTrackHeaders;
