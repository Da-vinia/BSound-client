import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  
import LogoNavbar from "../assets/images/logo-green.png";
import AddIcon from "../assets/images/icons/plus-icon (1).png";
import ProfileIcon from "../assets/images/icons/face-icon.png";
import MusicalNoteIcon from "../assets/images/icons/musicalNote-icon (2).png";
 
function Navbar() {

    const { 
        isLoggedIn,
        user,                   
        logOutUser             
      } = useContext(AuthContext);
  
  return (
    <nav>
      <div className="Navbar-wrapper">
      <div className="Logo-wrapper">
        <Link to="/" className="logo-navbar"> 
          <img src={LogoNavbar}  />
        </Link>
      </div>
  
      {isLoggedIn && (
  
        <div className="Navbar-links">

          <Link to="/products" className="navbar-links">
            <div className="text-nav">
              Soundgear Rentals
            </div>
            <img src={MusicalNoteIcon} />
          </Link>  
         
            {/* <button onClick={logOutUser} >Logout</button> */}
            <Link to="/add" className="navbar-links"> 
              <div className="text-nav">
                Add your soundgear
              </div>
              <img src={AddIcon} />
            </Link>
          
            <Link to="/profile" className="navbar-links"> 
              <div className="text-nav">
                Profile
              </div>
              <img src={ProfileIcon} />
            </Link>

           
           
          </div>
      )}
 
      {!isLoggedIn && (
        <div className="Navbar-links">
          <Link to="/login" className="Login"> Login </Link>
          <Link to="/signup" className="SignUp"> Sign Up</Link>
        </div>
      )}
      </div>
    </nav>
  );
}
 
export default Navbar;