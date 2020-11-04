import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const LinkIcon = ({ icon, href }) => {
  return (
    <a href={href}>
      <FontAwesomeIcon size='2x' icon={icon} className='linkIcon' />
    </a>
  );
};

LinkIcon.propTypes = {
  icon: PropTypes.element,
  href: PropTypes.string,
};
LinkIcon.defaultProps = {
  icon: null,
  href: '',
};
export default LinkIcon;
