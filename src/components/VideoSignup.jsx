import videoSignup from '../assets/videos/video-cdj.mp4'

function VideoSignup() {
    return (
        <div className="VideoSignup">
            <video autoPlay loop muted>
                <source src={videoSignup} type="video/mp4" />
                Your browser does not support video playback.
            </video>
        </div>
    );
}

export default VideoSignup;