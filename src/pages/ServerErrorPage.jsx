import Error500Video from "../assets/videos/error500.mp4";
import { Link } from "react-router-dom";

function ServerErrorPage() {
    return(
        <div className="error-container">
        <div className="error-video-container">
            <video autoPlay loop muted>
                <source src={PartyVideo} type="video/mp4" />
                    Your browser does not support video playback.
            </video>

        </div>
        <div className="error-text-container">
            <h1>500</h1>
            <h2>Looks like something went off-key in the techno symphony. <br /> 
            Our engineers are working to bring back the groove. Stay tuned!</h2>
            <button>
                <Link to={"/"}>Back Home</Link>
            </button>          
        </div>
    </div>

    )
}

export default ServerErrorPage;