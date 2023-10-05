import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import RentingPage from "./pages/RentingPage";
import AboutUsPage from "./pages/AboutUsPage";
import ErrorPage from "./pages/ErrorPage";
import ServerErrorPage from './pages/ServerErrorPage'; 


function App() {
 
  return (
    <div className="App">
       <Routes>
     <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
      {/* <Navbar /> */}
      
          <Route path="/" element={ <HomePage /> } />
          <Route path="/signup" element={ <SignupPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/profile" element={ <ProfilePage /> } />
          <Route path="/products" element={ <ProductsPage /> } />
          <Route path="/add" element={ <AddProductPage /> } />
          <Route path="/renting/:productId" element={ <RentingPage /> } />
          <Route path="/about" element={ <AboutUsPage /> } />
          
          
          </Route>
          <Route exact path="*" element={<ErrorPage />}></Route>
          <Route exact path="/server-error" element={<ServerErrorPage />}></Route> 
       </Routes>
  
    </div>
  );
}
export default App;