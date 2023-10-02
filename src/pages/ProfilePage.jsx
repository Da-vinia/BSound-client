import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";  
import DefaultAvatar from "../assets/images/avatar-default.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import EditProfile from "../components/EditProfile";


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
    const [userBookings, setUserBookings] = useState([]);

    const [showEditForm, setShowEditForm] = useState(false);

    const [showProducts, setShowProducts] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    
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
            setUserProducts(res.data.products); 
            setUserBookings(res.data.bookings);
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
    console.log(userProducts)

    const toggleShowProducts = () => {
        setShowProducts(!showProducts);
      };

    const toggleShowBookings = () => {
        setShowBookings(!showBookings);
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
            
            <button onClick={toggleShowProducts}>
            {showProducts ? "Hide My Sound Gears" : "My Sound Gears"}
            </button>
            {showProducts && (
                <div className="ProductList">
                    <ul>
                        {userProducts.map((product) => (
                        <li key={product._id}>
                            <img src={product.mediaUrl} alt={product.productName} />
                            <h3>{product.productName}</h3>
                            <p>{product.description}</p>
                            <p>Price: {product.pricePerDay} EUR/day</p>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
            
    
            <button onClick={toggleShowBookings}>
                {showBookings ? "Hide My Bookings" : "My Bookings"}
            </button>

            {showBookings && (
            <div>
                {userBookings.map((booking) => (
                        <li key={booking._id}>
                            {booking.productBooked && (
                                <div className="MyProductsDetails">
                                    <h3>Product: {booking.productBooked.productName}</h3>
                                    <img src={booking.productBooked.mediaUrl} alt={booking.productBooked.productName} />
                                </div>
                            )}
                            <p>From {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}</p>
                            <p> Price: {booking.totalPrice}  EUR</p>
                            {booking.productBooked && (
                            <>
                                <p> Owner's contact details: {booking.productBooked.contactDetails}</p>
                            
                            </>
                            )}   
                            
                        </li>
                        ))}
            </div>
        )}
        </div>
     
    )

}

export default ProfilePage;