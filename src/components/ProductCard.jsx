import { Link } from "react-router-dom";
import EditIconBlack from "../assets/images/icons/edit-icon-black.png";
import DeleteBnt from "../assets/images/icons/delete-icon.png";
import { useContext, useState  } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const API_URL = "http://localhost:5005";

function ProductCard( {productName, description, _id, mediaUrl, pricePerDay, owner, onDeleteProduct, onUpdateProduct}) {
    const { user } = useContext(AuthContext);
    const isOwner = user && owner && user._id === owner._id;

    const [isEditing, setIsEditing] = useState(false);
    const [editedProductData, setEditedProductData] = useState({
    productName,
    description,
    pricePerDay,
    category: "",
    availability: {
        startDate: null,
        endDate: null,
    }, 
    mediaUrl,
    location: {
        city: "",
        district: "",
    }, 
    contactDetails: "",
  });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
    
        const storedToken = localStorage.getItem("authToken");
    
        axios
          .put(`${API_URL}/products/${_id}`, editedProductData, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            console.log("Producto actualizado:", response.data);
            setIsEditing(false);
            onUpdateProduct(response.data);
          })
          .catch((error) => {
            console.error("Error al actualizar el producto:", error);
          });
      };

    const handleImageChange = (e) => {
        setEditedProductData({
          ...editedProductData,
          mediaUrl: e.target.value,
        });
      };


    const handleDelete = () => {
        const storedToken = localStorage.getItem('authToken');
        
        axios.delete(`${API_URL}/products/${_id}`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then(() => {
            onDeleteProduct(_id);
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
        });
      };

    return (
        <div className="ProductCardContainer">
            {isOwner && (
                <div className="IconsWrapper">
                    {/* {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                    ) : ( */}
                    <img src={EditIconBlack} onClick={handleEdit} />
                    {/* )} */}
                    <img src={DeleteBnt} onClick={handleDelete} />      
                </div>
            )}

            {isEditing ? (
                
                <div>
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    id="productName"
                    value={editedProductData.productName}
                    onChange={(e) =>
                    setEditedProductData({
                        ...editedProductData,
                        productName: e.target.value,
                    })
                    }
                />
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={editedProductData.category}
                    onChange={(e) =>
                    setEditedProductData({
                        ...editedProductData,
                        category: e.target.value,
                    })
                    }
                >
                    <option value="speakers">Speakers</option>
                    <option value="microphones">Microphones</option>
                    <option value="turntables">Turntables</option>
                    <option value="audio cables">Audio Cables</option>
                    <option value="instruments">Instruments</option>
                    <option value="lighting">Lighting</option>
                </select>
                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    id="description"
                    value={editedProductData.description}
                    onChange={(e) =>
                    setEditedProductData({
                        ...editedProductData,
                        description: e.target.value,
                    })
                    }
                />
                <label htmlFor="startDate">Available Start Date:</label>
                    <DatePicker
                    selected={editedProductData.availability.startDate}
                    onChange={(date) =>
                        setEditedProductData({
                        ...editedProductData,
                        availability: {
                            ...editedProductData.availability,
                            startDate: date,
                        },
                        })
                    }
                    placeholderText="Select start date"
                    required
                    />

                    <label htmlFor="endDate">Available End Date:</label>
                    <DatePicker
                    selected={editedProductData.availability.endDate}
                    onChange={(date) =>
                        setEditedProductData({
                        ...editedProductData,
                        availability: {
                            ...editedProductData.availability,
                            endDate: date,
                        },
                        })
                    }
                    placeholderText="Select end date"
                    required
                    />
                <label htmlFor="pricePerDay">Price Per Day:</label>
                <input
                    type="number"
                    id="pricePerDay"
                    value={editedProductData.pricePerDay}
                    onChange={(e) =>
                    setEditedProductData({
                        ...editedProductData,
                        pricePerDay: e.target.value,
                    })
                    }
                />
                <label htmlFor="locationDistrict">Choose a district:</label>
                <select
                    id="locationDistrict"
                    value={editedProductData.location.district}
                    onChange={(e) =>
                        setEditedProductData({
                        ...editedProductData,
                        location: {
                            ...editedProductData.location,
                            district: e.target.value,
                        },
                        })
                    }
                    >
                    <option value="Mitte">Mitte</option>
                    <option value="Friedrichshain-Kreuzberg">Friedrichshain-Kreuzberg</option>
                    <option value="Pankow">Pankow</option>
                    <option value="Charlottenburg-Wilmersdorf">Charlottenburg-Wilmersdorf</option>
                    <option value="Spandau">Spandau</option>
                    <option value="Steglitz-Zehlendorf">Steglitz-Zehlendorf</option>
                    <option value="Tempelhof-Schöneberg">Tempelhof-Schöneberg</option>
                    <option value="Neukölln">Neukölln</option>
                    <option value="Treptow-Köpenick">Treptow-Köpenick</option>
                    <option value="Marzahn-Hellersdorf">Marzahn-Hellersdorf</option>
                    <option value="Lichtenberg">Lichtenberg</option>
                    <option value="Reinickendorf">Reinickendorf</option>
                </select>
                <label htmlFor="contactDetails">Contact Details:</label>
                <input
                    type="text"
                    id="contactDetails"
                    value={editedProductData.contactDetails}
                    onChange={(e) =>
                        setEditedProductData({
                        ...editedProductData,
                        contactDetails: e.target.value,
                        })
                }
                />
                <label htmlFor="mediaUrl">Edit Image URL:</label>
                <input
                    type="file"
                    id="mediaUrl"
                    accept="image/*"
                    // value={editedProductData.mediaUrl}
                    onChange={handleImageChange}
                />
                <button onClick={handleSave}>Save</button>
            </div>


             ) : (
            <div>
                <h2>{productName}</h2>
                <img src={mediaUrl} alt={productName} />
                <p>{description}</p>
                <h4>{pricePerDay} <span>EUR/day</span></h4>
                <button>Rent</button>
            </div>
            )}
            
        </div>

     
    )
}

export default ProductCard;