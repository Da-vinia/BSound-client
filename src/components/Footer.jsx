import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud, faInstagram, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer>
            <div className="Footer-wrapper">
                <div className="SocialMedia-links">
                    <Link to="https://www.instagram.com"  className="social-link">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <Link to="https://soundcloud.com" className="social-link">
                        <FontAwesomeIcon icon={faSoundcloud} />
                    </Link>
                    <Link to="https://open.spotify.com" className="social-link">
                        <FontAwesomeIcon icon={faSpotify}  />
                    </Link>
                    <Link to="https://www.youtube.com" className="social-link">
                        <FontAwesomeIcon icon={faYoutube} />
                    </Link>
                </div>

                <div className="divider"></div>
                <Link to={"/about"} className="about-link">About us </Link>
              

                <p>made with <FontAwesomeIcon icon={faHeart} size="15x" color="#32FFDA" />  by 
                    {/* <Link to="https://www.daviniatosco.com/" className="footer-link">  Davinia Tosco </Link> */}
                    <a href="https://www.daviniatosco.com/" className="footer-link" target="_blank" rel="noopener noreferrer">
                        Davinia Tosco
                    </a>
                </p>
                <p>copyright © 2023 - All rights reserved</p>

            </div>
        </footer>
    )
}

export default Footer;