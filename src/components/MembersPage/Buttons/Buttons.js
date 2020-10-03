import React from "react";
import "./buttons.scss";
import { Button } from "reactstrap";

function Buttons(props) {
  return (
    <div className='membersButtonsGroup'>

      <Button outline color="secondary" className='progressMemberButton' id={props.userId}
              onClick={props.handleProgress}>
        Progress
      </Button>
      <Button outline color="secondary" className='tasksMemberButton' id={props.userId}
              onClick={props.handleTasks}>
        Tasks
      </Button>
      <Button outline color="secondary" className='editMemberButton' id={props.userId}
              onClick={props.handleEdit}>
        Edit
      </Button>
      <Button outline color="danger" className='deleteMemberButton' id={props.userId}
              onClick={props.handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default Buttons;
