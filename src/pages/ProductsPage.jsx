import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; 
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5005";

function ProductsPage () {
    const [products, setProducts] = useState([]);


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

    const handleUpdateProduct = (updatedProduct) => {
        
        const updatedIndex = products.findIndex((product) => product._id === updatedProduct._id);
    
        if (updatedIndex !== -1) {
          const updatedProducts = [...products];
          updatedProducts[updatedIndex] = updatedProduct;
          setProducts(updatedProducts);
        }
      };

    return (

        <div className="ProductsListContainer">

    {/* <Search /> here is the search compoenent with the search by category */}

        { products.map((product) => (
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
        ))
        }
        </div>

    )
}

export default ProductsPage;