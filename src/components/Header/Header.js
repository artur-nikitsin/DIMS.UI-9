import React, { useState } from 'react';
import './Header.scss';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import NavButton from '../common/Buttons/NavButton/NavButton';
import ThemeSwitcher from './Toggle/ThemeSwitcher';
import isAdminOrMentor from '../common/Conditions/isAdminOrMentor';
import changeReactstrapColor from '../helpers/changeReactstrapColor/changeReactstrapColor';
import Logo from '../../Logo/Logo';

const Header = ({ isLogin, handleLogout, theme, role, onSwitchTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand='md' className={`${theme} AdaptHeader`}>
        <NavbarBrand href='/' className='logoContainer'>
          <Logo path='/assets/img/logo.png' />
        </NavbarBrand>
        {isLogin && <NavbarToggler onClick={toggle} />}
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
                <ThemeSwitcher className='themeSwitcher' onSwitchTheme={onSwitchTheme} theme={theme} />
                <Button outline color={changeReactstrapColor(theme)} className='logoutButton' onClick={handleLogout}>
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

Header.propTypes = {
  isLogin: PropTypes.bool,
  theme: PropTypes.string,
  role: PropTypes.string,
  handleLogout: PropTypes.func,
};

Header.defaultProps = {
  isLogin: false,
  theme: PropTypes.string,
  role: '',
  handleLogout: null,
};
export default Header;
