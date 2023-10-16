import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = "https://bsound.onrender.com/api";

function EditProduct({ _id, onUpdateProduct, onCancelEdit }) {
   //  const [editedProductData, setEditedProductData] = useState({ ...productData });
    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState("");

    const [editedProductData, setEditedProductData] = useState({
        productName: "",
        description: "",
        pricePerDay: 0,
        category: "",
        availability: {
          startDate: new Date(),
          endDate: null,
        },
        mediaUrl: "",
        location: {
          locationCity: "",
          locationDistrict: "",
        },
        contactDetails: "",
      });

    const handleSave = (e) => {
        e.preventDefault();

        const formData = new FormData();
            formData.append("productName", editedProductData.productName);
            formData.append("description", editedProductData.description);
            formData.append("pricePerDay", editedProductData.pricePerDay);
            formData.append("category", editedProductData.category);
            formData.append("availability.startDate", editedProductData.availability.startDate);
            formData.append("availability.endDate", editedProductData.availability.endDate);
            formData.append("location.district", editedProductData.location.district);
            formData.append("contactDetails", editedProductData.contactDetails);
            if (imageFile) {
                formData.append("mediaUrl", imageFile);
            }
            
        const storedToken = localStorage.getItem("authToken");
  
      axios
        .put(`${API_URL}/products/${_id}`, formData, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log("Product updated:", response.data);
          onUpdateProduct(response.data);
        })
        .catch((error) => {
          console.error("Error updating the product:", error);
        });
    };
  
    const handleCancel = () => {
      onCancelEdit();
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedProductData({
        ...editedProductData,
        [name]: value,
      });
    };
  
    const handleDateChange = (date, field) => {
      setEditedProductData({
        ...editedProductData,
        [field]: date,
      });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImageFile(selectedImage);

        if (selectedImage) {
            const previewURL = URL.createObjectURL(selectedImage);
            setImage(previewURL);
        } else {
            setImage(""); 
        }

      };
  
    return (
        <div className="EditProductContainer">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={editedProductData.productName}
          onChange={handleInputChange}
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={editedProductData.category}
          onChange={handleInputChange}
        >
          <option value="">Choose a category</option>
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
          name="description"
          value={editedProductData.description}
          onChange={handleInputChange}
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
          name="pricePerDay"
          value={editedProductData.pricePerDay}
          onChange={handleInputChange}
        />
        <label htmlFor="locationDistrict">Choose a district:</label>
        <select
          id="locationDistrict"
          name="location.district"
          value={editedProductData.location.district}
          onChange={handleInputChange}
        >
            <option value="">Choose a category</option>
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
          name="contactDetails"
          value={editedProductData.contactDetails}
          onChange={handleInputChange}
        />
        <label htmlFor="mediaUrl">Edit Image:</label>
        <input
          type="file"
          id="mediaUrl"
          name="mediaUrl"
          accept="image/*"
          onChange={handleImageChange}
        />
        <img src={image} alt="Product Preview" />
        <div className="edit-btn-wrapper">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>
      </div>
    );
  }
  
  export default EditProduct;