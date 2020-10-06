import React from "react";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { FOOTER_TITLE } from "../constants/titles";

function Footer() {
  return (
    <div className='footer'>
      <div className="footerContent">
        <ul className="linksContainer">
          <li><FontAwesomeIcon size="2x" icon={faTelegramPlane} className="linkIcon" /></li>
          <li><FontAwesomeIcon size="2x" icon={faGithub} className="linkIcon" /></li>
          <li><FontAwesomeIcon size="2x" icon={faEnvelope} className="linkIcon" /></li>
        </ul>
        <p className='allRights'>{FOOTER_TITLE}</p>
      </div>
    </div>
  );
}

export default Footer;
