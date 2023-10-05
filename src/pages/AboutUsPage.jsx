import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import AboutUsImage from "../assets/images/aboutUs.jpg";

function AboutUsPage() {

    return (
       
    <div className="about-us">
      <h1>Welcome to BSound,</h1>
        
        <p>
            the epicenter of sound and music in Berlin! BSound is
            your gateway to the vibrant music scene of the city. Whether you're a
            musician, a music enthusiast, or just looking for some good tunes,
            you've come to the right place.
        </p>
        <p>
            Our <span>mission</span>  is to connect people through the universal language of
            music. With BSound, you can explore a wide range of sound equipment,
            rent musical instruments, and discover local artists and events.
        </p>
        <p>
            Here's what you can <span>do</span> with BSound:
        </p>
        <ul>
            <li>Rent high-quality sound equipment for your events or gigs.</li>
            <li>Connect with local musicians and music enthusiasts.</li>
            <li>Discover upcoming music events and concerts in Berlin.</li>
            <li>Share your own musical talents and creations with the community.</li>
        </ul>
        <p>
            <span>Join</span> me on this musical journey and become a part of the BSound
            community. Let's make music and memories together!
        </p>

        <div className="contact-wrapper">
            <div className="contact-img">
                <img src={AboutUsImage}  />
            </div>
            <div className="Contact-media">
                <Link to="https://soundcloud.com" className="contact-link">
                    <FontAwesomeIcon icon={faSoundcloud} />
                </Link>
                <Link to="https://github.com/Da-viniawww.linkedin.com/in/davinia-tosco-abreu" className="contact-link">
                    <FontAwesomeIcon icon={faGithub} />
                </Link>
                <Link to="https://www.linkedin.com/in/davinia-tosco-abreu" className="contact-link">
                    <FontAwesomeIcon icon={faLinkedin} />
                </Link>
            </div> 
        </div>   
    </div>
    )
}

export default AboutUsPage;


                   
                   