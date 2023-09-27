import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero image-overlay.jpg"

function HomePage() {
    return(
        <div className="containerHome">
            <img src={heroImage} alt="light forest" />
            <div className="TextHeroWrapper">
                <h1>Welcome to the epicenter of sound and music in Berlin!</h1>
                <p>Explore, rent, and connect with the vibrant music scene of the city 
                    at BSound (SoundRaver) Berlin. The party starts here... 
                </p>
                <Link to={"/rentals"}> Explore Now </Link>
            </div>
            
        </div>
    )
}

export default HomePage;