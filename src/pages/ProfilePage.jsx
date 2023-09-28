import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";  
import DefaultAvatar from "../assets/images/avatar-default.png";
import EditIcon from "../assets/images/icons/edit-icon.png"
import EditProfile from "../components/EditProfile";

function ProfilePage(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    useEffect(()=> {
        const storedToken = localStorage.getItem('authToken');
        axios.get("http://localhost:5005/profile", { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((res)=> {
            console.log(res)
            const userData = res.userData;
            
        })
        .catch((err)=> {
            console.log(err)
        })

    }, [])

    const handleOpenEdit = () => {
        setIsEditing(true); 
      };

    return(
        <div className="ProfileContainer">
            <div className="avatar-wrapper">
                <img src={DefaultAvatar} alt="default avatar" />

                <div className="edit-icon-wrapper">
                    <img onClick={handleOpenEdit} src={EditIcon} alt="edit icon" />

                    <div className="EditForm">
                        <EditProfile />
                    </div>
                </div>
                <h3>{props.name}</h3>
                <h4>{props.email}</h4>
            </div>
            <div className="ProfileContentWrapper">

            </div>


        </div>
    )
}

export default ProfilePage;