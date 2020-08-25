import React from 'react';
import './memberProgress.css';

class MemberProgress extends React.Component {
  createMemberProgressTable = () => {
    const tableHeaders = (
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
    );

    return (
      <div>
        <button className={'returnToFullListButton'} onClick={this.props.handleReturnToFullList}>
          Return to full list
        </button>
        <table className={'membersTable'}>
          {tableHeaders}
          <tbody></tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div>{this.createMemberProgressTable()}</div>;
  }
}

export default MemberProgress;
