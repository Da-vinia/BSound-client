import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoSignup from "../components/VideoSignup";

 
const API_URL = "https://bsound.onrender.com/api";
 
 
function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const navigate = useNavigate();
    
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    
    
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, name };
    
        axios.post(`${API_URL}/auth/signup`, requestBody)
        .then((response) => {
            console.log('Response from server:', response);
            navigate('/products');
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })

    };
 
  
  return (
    
    <div className="container">
        <div className="SignupPage">

            <div className="videoContainer">
                <VideoSignup />
            </div>

            <div className="formContainer">
                <h1>Unlock the Sound of Berlin. Join Us Now!</h1>
    
                <form onSubmit={handleSignupSubmit}>
                <label>Name:</label>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                    placeholder="My Name"
                />

                <label>Email:</label>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="email@email.com"
                />

                <label>Password:</label>
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="******"
                />
                <div className="join-btn">
                    <button type="submit">Join</button>
                </div>
                </form>

                { errorMessage && <p className="error-message">{errorMessage}</p> }
                <div className="signup-text-wrap">
                    <p>If you already have an account...</p>
                    <Link to={"/login"}> Login here</Link>
                </div>
            </div>
        </div>
    </div>     
     
    
  )
}
 
export default SignupPage;