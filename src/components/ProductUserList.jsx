// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { Accordion, Card, Button } from "react-bootstrap";
// // import { AuthContext } from "../context/auth.context";  
// // import ProductCard from "./ProductCard";

// function ProductUserList ({ userId, productId }) {
//   const [userProducts, setUserProducts] = useState([]);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('authToken');

//     axios.get(`https://bsound.onrender.com/profile`, { headers: { Authorization: `Bearer ${storedToken}`} })
//       .then((response) => {
//         setUserProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error to get the user products:", error);
//       });
//   }, [userId]);
//   console.log(userProducts)
//   return (
//     <Accordion>
//       <Card>
//         <Card.Header>
//           <Accordion.Toggle as={Button} variant="link" eventKey="0">
//             My Products
//           </Accordion.Toggle>
//         </Card.Header>
//         <Accordion.Collapse eventKey="0">
//           <Card.Body>
//             <ul>
//             {userProducts.map((product) => (
//             <ProductCard key={product._id} {...product} />
//         ))}
//               {/* {userProducts.map((product) => (
//                 <li key={product._id}>{product.productName}</li>
//               ))} */}
//             </ul>
//           </Card.Body>
//         </Accordion.Collapse>
//       </Card>
//     </Accordion>

//   );
// }

// export default ProductUserList;