import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './themeSwitcher.scss';
import { themes } from '../../constants/themes';
import PropTypes from 'prop-types';

const ThemeSwitcher = ({ theme, onSwitchTheme }) => {
  const handleSwitch = ({ target: { value } }) => {
    const { dark, light } = themes;
    const theme = value === 'dark' ? light : dark;
    onSwitchTheme(theme);
  };

  return (
    <Toggle
      defaultChecked={theme === 'dark'}
      className='themeSwitcher'
      value={theme}
      icons={{
        checked: <FontAwesomeIcon size='xs' icon={faMoon} className='moonIcon' />,
        unchecked: <FontAwesomeIcon size='xs' icon={faSun} className='sunIcon' />,
      }}
      onChange={handleSwitch}
    />
  );
};

ThemeSwitcher.propTypes = {
  theme: PropTypes.string,
  onSwitchTheme: PropTypes.func,
};

ThemeSwitcher.defaultProps = {
  theme: 'light',
  onSwitchTheme: null,
};
export default ThemeSwitcher;
