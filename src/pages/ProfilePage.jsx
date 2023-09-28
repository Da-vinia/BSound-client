import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";  
import DefaultAvatar from "../assets/images/avatar-default.png";
import EditIcon from "../assets/images/icons/edit-icon.png"
import EditProfile from "../components/EditProfile";
import ProductUserList from "../components/ProductUserList";

const API_URL = "http://localhost:5005";

function ProfilePage(props) {
    const { userId } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [showEditForm, setShowEditForm] = useState(false);
    

    useEffect(()=> {
        const storedToken = localStorage.getItem('authToken');
        
        axios.get(`${API_URL}/profile/`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((res)=> {
            console.log(res)
            // const userData = res.userData;
            const userData = res.data.user;
            setName(userData.name);
            setEmail(userData.email);
            
        })
        .catch((err)=> {
            console.log(err)
        })

    }, [])

    const handleOpenEdit = () => {
        setShowEditForm(true); 
      };

    const handleCloseEdit = () => {
        setShowEditForm(false);
    };

    return(
        <div className="ProfileContainer">
            <div className="avatar-wrapper">
                <img src={DefaultAvatar} alt="default avatar" />
            </div>
            <div className="edit-icon-wrapper">
                <img onClick={handleOpenEdit} src={EditIcon} alt="edit icon" />
            </div>
            <div className="ProfileContentWrapper">
                <h3>{name}</h3>
                <h4>{email}</h4>
            </div>
            <div className="EditForm">
                {showEditForm && 
                    <EditProfile 
                        userId={props.userId} 
                        onCloseEdit={handleCloseEdit}
                        showForm={showEditForm}
                    />
                }    
            </div>

            <button>My Bookings</button>
            <div>
                {/* <ProductUserList userId={userId}/> */}
            </div>
            <button>My Listings</button>
            <button>My Sound Gears</button>
        </div>
    )
}

export default ProfilePage;