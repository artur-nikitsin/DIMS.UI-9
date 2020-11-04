import React from 'react';
import './footer.scss';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FOOTER_TITLE } from '../constants/titles';
import LinkIcon from '../common/LinkIcon/LinkIcon';

function Footer() {
  return (
    <div className='footer'>
      <div className='footerContent'>
        <ul className='linksContainer'>
          <li>
            <LinkIcon icon={faTelegramPlane} href='https://t.me/zapecankin' />
          </li>
          <li>
            <LinkIcon icon={faGithub} href='https://github.com/artur-nikitsin' />
          </li>
          <li>
            <LinkIcon icon={faEnvelope} href='mailto:artur.nikitsin@gmail.com' />
          </li>
        </ul>
        <p className='allRights'>{FOOTER_TITLE}</p>
      </div>
    </div>
  );
}

export default Footer;
