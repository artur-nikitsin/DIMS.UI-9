import React, { useState } from 'react';
import './Header.scss';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import NavButton from '../common/Buttons/NavButton/NavButton';
import ThemeSwitcher from './Toggle/ThemeSwitcher';
import isAdminOrMentor from '../common/Conditions/isAdminOrMentor';

const Header = ({ isLogin, handleLogout, theme, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand='md' className={`${theme} AdaptHeader`}>
        <NavbarBrand href='/' className='logoContainer'>
          <img className='devIncubatorLogo' src='/assets/img/logo.png' alt='devIncubator' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            {isAdminOrMentor(role) && (
              <NavItem className='navButtons'>
                <NavButton
                  label='Members'
                  to='/users'
                  className={`${theme} navButton`}
                  color={theme === 'dark' ? 'secondary' : 'primary'}
                />
                <NavButton
                  label='Tasks'
                  to='/tasks'
                  className={`${theme} navButton`}
                  color={theme === 'dark' ? 'secondary' : 'primary'}
                />
              </NavItem>
            )}
            {isLogin && (
              <div className='buttonsContainer'>
                <ThemeSwitcher className='themeSwitcher' />
                <Button
                  outline
                  color={theme === 'dark' ? 'secondary' : 'primary'}
                  className='logoutButton'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
