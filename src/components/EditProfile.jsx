import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfilePage from "../pages/ProfilePage";
import DefaultAvatar from "../assets/images/avatar-default.png";
import CloseBtn from "../assets/images/icons/icon-close-btn.png"
 
const API_URL = "http://localhost:5005";
 
function EditProfile({ onCloseEdit }) {

    const {userId} = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("../assets/images/avatar-default.png");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();
    
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handleAvatar = (e) => setAvatar(e.target.files[0]);
    
    
    const handleEditProfile = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("avatar", avatar);


        // const requestBody = { email, password, name, avatar };
        axios.put(`${API_URL}/profile/${userId}`, formData)
        
        .then((response) => {
            console.log(response)
            console.log(formData)
            // navigate('/profile');
            onCloseEdit();
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })

    };

    const handleCloseEditForm = () => {
        // setShowForm(false);
        // props.onCloseEdit();
        onCloseEdit();
    }

    return(

        <div className={`EditFormContainer ${showForm ? '' : 'hidden'}`}>

            <div className="closeBtn">
                <img onClick={handleCloseEditForm} src={CloseBtn} alt="close button" />
            </div>
            <h2>Edit your profile</h2>

 
            <form onSubmit={handleEditProfile} encType="multipart/form-data">
            
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

            <label>Choose a new avatar:</label>
            <input 
                type="file"
                name="avatar"
                // value={avatar}
                onChange={handleAvatar}
            />

            <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile;