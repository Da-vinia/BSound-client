import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import RentingPage from "./pages/RentingPage";


function App() {
 
  return (
    <div className="App">
      <Navbar />
       <Routes>
          <Route path="/" element={ <HomePage /> } />



          <Route path="/signup" element={ <SignupPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/profile" element={ <ProfilePage /> } />
          <Route path="/products" element={ <ProductsPage /> } />
          <Route path="/add" element={ <AddProductPage /> } />
          <Route path="/renting/:productId" element={ <RentingPage /> } />



       </Routes>

    </div>
  );
}
export default App;