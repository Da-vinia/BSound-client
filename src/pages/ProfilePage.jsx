import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";  
import DefaultAvatar from "../assets/images/avatar-default.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import EditProfile from "../components/EditProfile";
import ProductUserList from "../components/ProductUserList";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5005";

function ProfilePage(props) {
    // const { userId } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [userId, setUserId] = useState("");
    const [userProducts, setUserProducts] = useState([]);

    const [showEditForm, setShowEditForm] = useState(false);
    
    const handleProfileFetch = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${API_URL}/profile/`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((res)=> {
            console.log(res)
            // const userData = res.userData;
            const userData = res.data.user;
            setUserId(userData._id);
            setName(userData.name);
            setEmail(userData.email);
            setAvatar(userData.avatar);
            setPassword(userData.password);

            setUserProducts(userData.products); 
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    useEffect(()=> {
        handleProfileFetch()
    }, [])

    const handleOpenEdit = () => {
        setShowEditForm(true); 
      };

    const handleCloseEdit = () => {
        setShowEditForm(false);
    };

    return(
        <div className="ProfileContainer">
            <div className="avatar">
                <img id="avatar" src={avatar} alt="default avatar" />
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
                        handleProfileFetch={handleProfileFetch}
                    />
                }    
            </div>

            <button>My Sound Gears</button>
            <div>
                {/* <ProductUserList userId={props.userId} /> */}
            </div>
            <button>My Listings</button>
            <button>My Bookings</button>
        </div>
    )
}

export default ProfilePage;