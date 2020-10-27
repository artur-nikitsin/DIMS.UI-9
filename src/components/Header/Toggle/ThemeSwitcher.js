import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './themeSwitcher.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

class ThemeSwitcher extends React.PureComponent {
  handleSwitch = (event) => {
    const { value } = event.target;
    const theme = value === 'dark' ? 'light' : 'dark';
    this.context.onSwitchTheme(theme);
  };

  render() {
    const { theme } = this.context;
    return (
      <Toggle
        defaultChecked={theme === 'dark'}
        className='themeSwitcher'
        value={theme}
        icons={{
          checked: <FontAwesomeIcon size='xs' icon={faMoon} className='moonIcon' />,
          unchecked: <FontAwesomeIcon size='xs' icon={faSun} className='sunIcon' />,
        }}
        onChange={this.handleSwitch}
      />
    );
  }
}

ThemeSwitcher.contextType = ThemeContext;
export default ThemeSwitcher;
