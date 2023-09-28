import videoSignup from '../assets/videos/video-cdj.mp4'

function VideoSignup() {
    return (
        <div className="VideoSignup">
            <video autoPlay loop muted>
                <source src={videoSignup} type="video/mp4" />
                Tu navegador no admite la reproducción de video.
            </video>
        </div>
    );
}

export default VideoSignup;