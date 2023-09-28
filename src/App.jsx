import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";


function App() {
 
  return (
    <div className="App">
      <Navbar />
       <Routes>
          <Route path="/" element={ <HomePage /> } />



          <Route path="/signup" element={ <SignupPage /> } />
          <Route path="/login" element={ <LoginPage /> } />


       </Routes>

    </div>
  );
}
export default App;