import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
const API_URL = "http://localhost:5005";
 
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
    
        console.log('JWT token', response.data.authToken );

        storeToken(response.data.authToken); 
        authenticateUser(); 
        navigate('/products');                            
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (

    <div className="container">
      <div className="LoginPage">
        <h1>Welcome back to the heartbeat of Berlin's music scene. <br /> Let's make some noise!</h1>
  
        <form id="login-form" onSubmit={handleLoginSubmit}>
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
          <div className="btn-wrapper">
            <button type="submit">Login</button>
          </div>
          
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Join us here</Link>
      </div>
    </div>
  )
}
 
export default LoginPage;