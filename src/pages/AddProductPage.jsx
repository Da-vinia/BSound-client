import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = "http://localhost:5005"; 

function AddProductPage() {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    // const [availableDays, setAvailableDays] = useState([]);
    // const [mediaUrl, setMediaUrl] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [locationCity, setLocationCity] = useState("Berlin");
    const [locationDistrict, setLocationDistrict] = useState("");
    const [contactDetails, setContactDetails] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [mediaUrl, setMediaUrl] = useState([]);
    // const [mediaUrl, setMediaUrl] = useState("");
    const [imageFile, setImageFile] = useState(null); 

    const navigate = useNavigate();

    const handleAddProduct = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("pricePerDay", pricePerDay);
        formData.append("locationCity", locationCity);
        formData.append("locationDistrict", locationDistrict);
        formData.append("contactDetails", contactDetails);

         if (imageFile) {
            formData.append("mediaUrl", imageFile);
        }
    
        
    
        const storedToken = localStorage.getItem('authToken');
    
        axios
            .post(`${API_URL}/products`, formData, { 
                headers: { 
                    Authorization: `Bearer ${storedToken}`
                    // "Content-Type": "multipart/form-data"  
                }
            })

            .then((response) => {
                console.log("Product created successfully:", response.data);
                navigate('/products'); 
            })
            .catch((error) => {
                console.error("Error adding the product:", error);
            });
    };

//     const handleAddProduct = (e) => {
//         e.preventDefault();
    
//         const newProduct = {
//           productName,
//           category,
//           description,
//           // availableDays,
//           availability: {
//             startDate,
//             endDate,
//           },
//         //   mediaUrl: [mediaUrl], 
//           mediaUrl,
//           pricePerDay,
//           location: {
//             city: locationCity,
//             district: locationDistrict,
//           },
//           contactDetails,
//         };
    
//         const storedToken = localStorage.getItem('authToken');

//         axios
//             .post(`${API_URL}/products`, newProduct, { headers: { Authorization: `Bearer ${storedToken}`} })
//             .then((response) => {
//                 console.log("Product created successfully:", response.data);
//                 navigate('/products');
                
//             })
//             .catch((error) => {
//                 console.error("Error adding the product:", error);
//             });
//   };


// const handleAddProduct = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("productName", productName);
//     formData.append("category", category);
//     formData.append("description", description);
//     formData.append("startDate", startDate);
//     formData.append("endDate", endDate);
//     formData.append("pricePerDay", pricePerDay);
//     formData.append("locationCity", locationCity);
//     formData.append("locationDistrict", locationDistrict);
//     formData.append("contactDetails", contactDetails);

//     // Agrega las imágenes al FormData
//     for (let i = 0; i < mediaUrl.length; i++) {
//         formData.append("mediaUrl", mediaUrl[i]);
//     }

//     const storedToken = localStorage.getItem('authToken');

//     axios
//         .post(`${API_URL}/products`, formData, { 
//             headers: { 
//                 Authorization: `Bearer ${storedToken}`,
//                 "Content-Type": "multipart/form-data"  
//             }
//         })
//         .then((response) => {
//             console.log("Product created successfully:", response.data);
//         })
//         .catch((error) => {
//             console.error("Error adding the product:", error);
//         });
// };

const handleImage = (e) => {
    const selectedImage = e.target.files[0];
   setImageFile(selectedImage);

    // if (selectedImage) {
    //     const previewURL = URL.createObjectURL(selectedImage);
    //     setImageFile(previewURL);
    // } 
};


    return (
        <div className="AddProductContainer">
            <h2>Add your soundgear</h2>

            <form onSubmit={handleAddProduct} encType="multipart/form-data">
            
            <label>Product Name:</label>
            <input 
                type="text"
                name="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                placeholder="soundgear name"
            />

            <label>Choose a category:</label>
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            >
                <option value="">Choose a category</option>
                <option value="speakers">Speakers</option>
                <option value="microphones">Microphones</option>
                <option value="turntables">Turntables</option>
                <option value="audio cables">Audio cables</option>
                <option value="instruments">Instruments</option>
                <option value="lighting">Lighting</option>
            </select>

            <label>Description:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>

            {/* <label>Available dates:</label>
            <input
            type="text"
            value={availableDays}
            onChange={(e) => setAvailableDays(e.target.value.split(","))}
            placeholder="Separados por comas (ej. Lunes, Miércoles, Viernes)"
            required
            /> */}
            <label>Available start date:</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select start date"
                required
            />

            <label>Available end date:</label>
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Select end date"
                required
            />

            

            <label>Price per day:</label>
            <input
                type="number"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
                required
            />

            {/* <label>District:</label>
            <input
                type="text"
                value={locationDistrict}
                
                required
            /> */}

            <label>Choose a district:</label>
                <select
                    name="district"
                    value={locationDistrict}
                    onChange={(e) => setLocationDistrict(e.target.value)}
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

            <label>Contact details:</label>
            <input
                type="text"
                value={contactDetails}
                onChange={(e) => setContactDetails(e.target.value)}
                required
            />

            <label >Upload your images:</label>
            <input className="mediaUrl"
                type="file"
                // value={mediaUrl}
                accept="image/*"
                // onChange={(e) => setMediaUrl(e.target.files[0])} 
                // onChange={(e) => setMediaUrl(e.target.value)}
                onChange={handleImage}
                //onChange={(e) => setMediaUrl(Array.from(e.target.files))}
                multiple 
                required
            />

            <button type="submit">Add your soundgear</button>
            </form>

        </div>
    )
}

export default AddProductPage;