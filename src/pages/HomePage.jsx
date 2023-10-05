import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero image-overlay.jpg";
import Footer from "../components/Footer";

function HomePage() {
    return(
        <div className="containerHome">
            <div className="hero-image-wrapper">
                <img src={heroImage} alt="light forest" />
            </div>
            <div className="TextHeroWrapper">
                <h1>Welcome to the epicenter <br /> of sound and music in Berlin!</h1>
                <p>Explore, rent, and connect <br /> with the vibrant music scene of the city 
                    at <br /> BSound in Berlin. The party starts here... 
                </p>
                <br />
                <Link to={"/products"} className="Homepage-link"> Explore Now </Link>
            </div>   
            
            <Footer />
        </div>
   
    )
}


export default HomePage;