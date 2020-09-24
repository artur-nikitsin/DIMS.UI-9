import React from 'react';
import './buttons.scss';

function Buttons(props) {
  return (
    <div className='membersButtonsGroup'>
      <button className='progressMemberButton' id={props.userId} onClick={props.handleProgress}>
        Progress
      </button>
      <button className='tasksMemberButton' id={props.userId} onClick={props.handleTasks}>
        Tasks
      </button>
      <button className='editMemberButton' id={props.userId} onClick={props.handleEdit}>
        Edit
      </button>
      <button className='deleteMemberButton' id={props.userId} onClick={props.handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Buttons;
