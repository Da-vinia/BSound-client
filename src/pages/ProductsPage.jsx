import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; 
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import SearchByCategory from "../components/SearchByCategory";

const API_URL = "https://bsound.onrender.com";

function ProductsPage () {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchByCategory, setSearchByCategory] = useState([]);

    const [originalProducts, setOriginalProducts] = useState([]);
    const [query, setQuery] = useState("")
    const getAllProducts = () => {
        axios 
            .get(`${API_URL}/products`)
            .then((response) => setProducts(response.data))
            .catch((error) => console.log(error));
    };
  
    useEffect(() => {
        getAllProducts();
    }, []);

    const handleDeleteProduct = (productId) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    };


    const getFilteredItems = (query, items)=> {
      if(!query){
        return items
      }
      const lowercaseQuery = query.toLowerCase();
      return products.filter((product) => product.productName.toLowerCase().includes(lowercaseQuery))
    }

    const filteredItems = getFilteredItems(query, products)
    console.log(filteredItems)
    const handleUpdateProduct = (updatedProduct) => {
        
        const updatedIndex = products.findIndex((product) => product._id === updatedProduct._id);
    
        if (updatedIndex !== -1) {
          const updatedProducts = [...products];
          updatedProducts[updatedIndex] = updatedProduct;
          setProducts(updatedProducts);
        }
      };
    
    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleSearchByCategory = (categoryResults) => {
        // const filteredProducts = products.filter(
        //   (product) => product.category === category
        // );
        setSearchByCategory(categoryResults);
      };

    return (
      
        <div className="ProductsListContainer">
          <div className="productsList-wrapper">
{/*    
            <Search onSearch={handleSearchResults} />
          */}
          <div className="SearchContainer">
            <form>
              <input 
                type="text"
                placeholder="Search products..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>

          

            <SearchByCategory 
            onSearch={handleSearchByCategory} 
            onCategorySelect={handleSearchByCategory}
            originalProducts={originalProducts}
            />

            {searchResults.length > 0 || searchByCategory.length > 0 ? (
        <div>
          {/* <h2>Search Results:</h2> */}
          {/* <ul> */}
            <div className="productCards-container">
            {(searchResults.length > 0 ? searchResults : searchByCategory).map(
              (product) => (
                <ProductCard
                  key={product._id}
                  onDeleteProduct={handleDeleteProduct}
                  onUpdateProduct={handleUpdateProduct}
                  productName={product.productName}
                  description={product.description}
                  pricePerDay={product.pricePerDay}
                  category={product.category}
                  availability={product.availability}
                  mediaUrl={product.mediaUrl}
                  location={product.location}
                  contactDetails={product.contactDetails}
                  owner={product.owner}
                  {...product}
                />
              )
            )}
            </div>
          {/* </ul> */}
        </div>
      ) : (
        <div className="productCards-container">
        {/* <ul> */}
          {filteredItems.map((product) => (
            <ProductCard
              key={product._id}
              onDeleteProduct={handleDeleteProduct}
              onUpdateProduct={handleUpdateProduct}
              productName={product.productName}
              description={product.description}
              pricePerDay={product.pricePerDay}
              category={product.category}
              availability={product.availability}
              mediaUrl={product.mediaUrl}
              location={product.location}
              contactDetails={product.contactDetails}
              owner={product.owner}
              {...product}
            />
          ))}
        {/* </ul> */}
        </div>
      )}
    </div>
    </div>
  );
}

export default ProductsPage;