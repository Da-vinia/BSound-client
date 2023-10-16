import React, { useState, useEffect } from "react";
import axios from "axios";
import AudioCableIcon from "../assets/images/icons/audio-cable-icon.png";
import LightingIcon from "../assets/images/icons/lighting-icon.png";
import InstrumentsIcon from "../assets/images/icons/instruments-icon.png";
import MicrophoneIcon from "../assets/images/icons/microphone-icon.png";
import SpeakerIcon from "../assets/images/icons/speakers-icon.png";
import TurntableIcon from "../assets/images/icons/turntable-icon.png";

const API_URL = "https://bsound.onrender.com";

function SearchByCategory({ onCategorySelect, originalProducts }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const categories = [
        { name: "Turntables", icon: TurntableIcon, slug: "turntables" },
        { name: "Microphones", icon: MicrophoneIcon, slug: "microphones" },
        { name: "Speakers", icon: SpeakerIcon, slug: "speakers" },
        { name: "Instruments", icon: InstrumentsIcon, slug: "instruments" },
        { name: "Lighting", icon: LightingIcon, slug: "lighting" },
        { name: "Audio Cables", icon: AudioCableIcon, slug: "audio-cables" },  
       
      ];

    const handleCategoryClick = (categorySlug) => {
        setSelectedCategory(categorySlug);
    };

    useEffect(() => {
        if (selectedCategory) {
          setLoading(true);
          axios
            .get(`${API_URL}/products/search/category?category=${selectedCategory}`)
            .then((response) => {
              setProducts(response.data);
              setLoading(false);
              onCategorySelect(response.data);
            })
            .catch((error) => {
              console.error("Error searching for products by category:", error);
              setLoading(false);
            });
        } else {
          setProducts([]);
          onCategorySelect(originalProducts);
        }
      }, [selectedCategory]);
    

    return (

      <div className="searchByCategory-container">
        <div className="searchCategory-wrapper">
          <h1>Here you can search by category:</h1>
          <div className="category-buttons">
            {categories.map((category) => (
              <div key={category.slug} onClick={() => handleCategoryClick(category.slug)} className="category-button">
                <div className="category-img-wrapper">
                    <div className="category-image">
                      <img src={category.icon} alt={category.name} />
                    </div>
                     <div className="category-name">
                      <span>{category.name}</span>
                    </div>
                    
                </div>
                
              </div>
            ))}
            <div onClick={() => handleCategoryClick(null)} className="category-button">
              <span>Show All</span>
            </div>
          </div>
          {/* {loading ? (
            <p>Loading...</p>
          ) 
          : (
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  <p>{product.productName}</p>
                  <p>{product.category}</p>
                </li>
              ))}
            </ul>
          )} */}
        </div>
        </div>
      );
}

export default SearchByCategory;