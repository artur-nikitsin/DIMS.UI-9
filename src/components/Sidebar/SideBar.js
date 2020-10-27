import React from 'react';
import './sideBar.scss';
import { RoleContext } from '../../contexts/RoleContext';
import NavButton from '../common/Buttons/NavButton/NavButton';
import isAdminOrMentor from '../common/Conditions/isAdminOrMentor';
import { ThemeContext } from '../../contexts/ThemeContext';

function SideBar() {
  return (
    <RoleContext.Consumer>
      {({ role }) => (
        <ThemeContext.Consumer>
          {({ theme }) => (
            <div className={`${theme} sideBar`}>
              {isAdminOrMentor(role) && (
                <div>
                  <NavButton label='Members' to='/app/members' className='navButton' color='secondary' />
                  <NavButton label='Tasks' to='/app/tasks' className='navButton' color='secondary' />
                </div>
              )}
            </div>
          )}
        </ThemeContext.Consumer>
      )}
    </RoleContext.Consumer>
  );
}

export default SideBar;
