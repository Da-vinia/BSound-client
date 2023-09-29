import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfilePage from "../pages/ProfilePage";
import DefaultAvatar from "../assets/images/avatar-default.png";
import CloseBtn from "../assets/images/icons/icon-close-btn.png"
 
const API_URL = "http://localhost:5005";
 
function EditProfile({ onCloseEdit, handleProfileFetch }) {

    const {userId} = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(DefaultAvatar);
    const [avatarFile, setAvatarFile] = useState(null); 

    const [errorMessage, setErrorMessage] = useState(undefined);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();
    
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    // const handleAvatar = (e) => setAvatar(e.target.files[0]);
    const handleAvatar = (e) => {
        const selectedAvatar = e.target.files[0];
        setAvatarFile(selectedAvatar);

        if (selectedAvatar) {
            const previewURL = URL.createObjectURL(selectedAvatar);
            setAvatar(previewURL);
        } else {
            setAvatar(DefaultAvatar); 
        }
    };
    
    
    const handleEditProfile = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        // formData.append("avatar", avatar);
        if (avatarFile) {
            formData.append("avatar", avatarFile);
        }

        const storedToken = localStorage.getItem('authToken');

        // const requestBody = { email, password, name, avatar };
        axios.put(`${API_URL}/profile`, formData, { headers: { Authorization: `Bearer ${storedToken}`} })
        
        .then((response) => {
            console.log(response)
            console.log(formData)
            // navigate('/profile');
            const avatarUrl = response.data.avatarUrl; 
            // setAvatar(avatarUrl);
            onCloseEdit();
            handleProfileFetch();
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
                accept="image/*"
                // value={avatar}
                onChange={handleAvatar}
            />
             <img src={avatar} alt="Avatar Preview" />

            <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile;