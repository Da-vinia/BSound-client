import React, { useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; 

const API_URL = "http://localhost:5005";

function Search({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);

  const handleSearch = () => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .post(`${API_URL}/products/search/keyword`, { keyword }, { headers: { Authorization: `Bearer ${storedToken}`} } )
      .then((response) => {
        onSearch(response.data);
      })
      .catch((error) => {
        console.error("Error searching for products:", error);
      });
  };
  const handleReset = () => {
    setKeyword("");
    onSearch(originalProducts);
  };

  const handleSearchInputChange = (e) => {
    setKeyword(e.target.value);
  };

  React.useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((response) => {
        setOriginalProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="SearchContainer">
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Search;