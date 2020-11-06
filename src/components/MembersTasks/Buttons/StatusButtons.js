import React from 'react';
import './buttons.scss';
import { Button } from 'reactstrap';
import { setTaskState } from '../../../firebase/apiSet';

const StatusButtons = ({ userId, stateId, loadMemberTaskPage }) => {
  const setTaskStatus = (stateId, status) => () => {
    setTaskState(stateId, status);
    loadMemberTaskPage();
  };

  return (
    <div className='statusButtonsGroup'>
      <Button
        outline
        color='success'
        className='successStatusButton'
        id={userId}
        onClick={setTaskStatus(stateId, 'Success')}
      >
        Success
      </Button>
      <Button outline color='danger' className='failStatusButton' id={userId} onClick={setTaskStatus(stateId, 'Fail')}>
        Fail
      </Button>
    </div>
  );
};

export default StatusButtons;
