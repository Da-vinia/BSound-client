import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";                      
import DefaultAvatar from "../assets/images/avatar-default.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import EditProfile from "../components/EditProfile";
import EditProduct from "../components/EditProduct";
import EditIconBlack from "../assets/images/icons/edit-icon-black.png";
import DeleteBnt from "../assets/images/icons/delete-icon.png";
import VideoProfile from "../assets/videos/video-garbicz.mp4";
import LogOutIcon from "../assets/images/icons/logout-icon.png";



const API_URL = "http://localhost:5005";

function ProfilePage(props) {
    // const { userId } = useParams();
    const { logOutUser } = useContext(AuthContext);
  
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

    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    
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

    const handleEditProduct = (productId) => {
        setEditingProductId(productId);
        setIsEditingProduct(true);
      };

      const handleCancelEditProduct = () => {
        setEditingProductId(null);
        setIsEditingProduct(false);
      };
    
      const handleDeleteProduct = (productId) => {
        const storedToken = localStorage.getItem('authToken');
        
        axios.delete(`${API_URL}/products/${productId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then(() => {
            onDeleteProduct(productId);
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
        });
    };

    const onDeleteProduct = (deletedProductId) => {
        setUserProducts((prevProducts) => prevProducts.filter((product) => product._id !== deletedProductId));
    };
    
    return(
        <div className="container">
        <div className="ProfileContainer">
            <div className="profile-content">
                <div className="avatar-edit-wrapper">
                    <div className="avatar">
                        <img id="avatar" src={avatar} alt="default avatar" />
                    </div>
                    <div className="edit-icon-wrapper">
                        <img onClick={handleOpenEdit} src={EditIcon} alt="edit icon" />
                    </div>
                </div>
                <div className="ProfileContentWrapper">
                    <h3>{name}</h3>
                    <h4>{email}</h4>
                </div>
                <div className={`EditProductContainer ${isEditing ? 'popup-form' : ''}`}>
                {showEditForm && (
                    <EditProfile 
                        userId={props.userId} 
                        onCloseEdit={handleCloseEdit}
                        showForm={showEditForm}
                        handleProfileFetch={handleProfileFetch}
                    />
                )}    
            </div>

            <div className="MyLists-wrapper">

            
            <button onClick={toggleShowProducts}
                // className={showProducts ? 'active' : ''}
            >
            {showProducts ? "Hide My Sound Gears" : "My Sound Gears"}
            </button>

            {/* <div className={`ProductList ${showProducts ? 'show-content' : ''}`}> */}
            {showProducts && (
                <div className="ProductList">
                    <ul>
                        {userProducts.map((product) => (
                            <li key={product._id}>
                            {isEditing && editingProductId === product._id ? (
                                <EditProduct
                                _id={product._id}
                                onUpdateProduct={handleEditProduct} 
                                onCancelEdit={handleCancelEditProduct}
                                />
                            ) : (
                                <div className="ProfileCards-wrapper">
                                    <div className="ProfileCard-img">
                                        <img src={product.mediaUrl} alt={product.productName} />
                                    </div>
                                    <div className="ProfileCard-details">
                                        <h3>{product.productName}</h3>
                                        <p>{product.description}</p>
                                        <p>Price: {product.pricePerDay} EUR/day</p>
                                    </div>
                                    <div className="ProfileCard-buttons">
                                        <img src={EditIconBlack}  onClick={() => handleEditProduct(product._id)} />
                                        <img src={DeleteBnt} onClick={() => handleDeleteProduct(product._id)} />
                                    </div>
                                       
                                    
                                {/* <button onClick={() => handleEditProduct(product._id)}>
                                Edit
                              </button>
                              <button onClick={() => handleDeleteProduct(product._id)}>
                                Delete
                              </button> */}
                              </div>
                            
                          )}
                           
                        </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* </div> */}
    
            <button 
                onClick={toggleShowBookings}
                className={showBookings ? 'active' : ''}
            >
                {showBookings ? "Hide My Bookings" : "My Bookings"}
            </button>
            <div className={`MyBookingsContent ${showBookings ? 'show-content' : ''}`}>
            {/* {showBookings && ( */}
            <div className="BookingLists">
                <div className="BookkingList">

                {userBookings.map((booking) => (
                        <li key={booking._id}>
                            {booking.productBooked && (
                                
                                <div className="ProfileBooking-wrapper">
                                    <div className="ProfileCard-img">
                                        <img src={booking.productBooked.mediaUrl} alt={booking.productBooked.productName} />
                                    </div>
                                    <div className="ProfileBooking-details">
                                        <h3>{booking.productBooked.productName}</h3> 
                                    </div>  
                                    
                                </div>
                            )}
                            <div className="booking-details-wrap">
                            <p>From {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}</p>
                            <p> Price: {booking.totalPrice}  EUR</p>
                            </div>
                            {booking.productBooked && (
                            <div className="contact-details">
                                <p>Contact details: <br /> {booking.productBooked.contactDetails}</p>
                            </div>
                            )}   
                            
                        </li>
                        ))}
                        
            </div>
            </div>
        {/* )} */}
        </div>
        <div className="logout-wrapper">
            <Link to="/" >
                <img src={LogOutIcon} onClick={logOutUser}  />
                    {/* <button onClick={logOutUser} >Logout</button>                        */}
            </Link>
        </div>
           
            </div>
            </div>
            <div className="videoContainer">
                <div className="VideoSignup">
                    <video autoPlay loop muted>
                        <source src={VideoProfile} type="video/mp4" />
                        Your browser does not support video playback.
                    </video>
                </div>
            </div>
        
        </div>
        </div>
    )

}

export default ProfilePage;