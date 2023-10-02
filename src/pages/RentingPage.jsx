import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = "http://localhost:5005"; 

function RentingPage() {
    const { user } = useContext(AuthContext);
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [booked,setBooked] = useState([])
    const [owner, setOwner] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());     
    const [isAvailable, setIsAvailable] = useState(true);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
    useEffect(() => {
      axios
        .get(`${API_URL}/products/${productId}`)
        .then((response) => {

          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }, [productId]);
  
    const handleConfirmBooking = () => {
      const storedToken = localStorage.getItem("authToken");

      const isDateAvailable = product.bookedDates ? product.bookedDates.every((booking) => {
        return (
          startDate >= new Date(booking.endDate) || endDate <= new Date(booking.startDate)
        );
      }) : true;
    
      if (!isDateAvailable) {
        setIsAvailable(false);
        return;
      }
    
      axios
        .post(
          `${API_URL}/booking`,
          {
            startDate,
            endDate,
            totalPrice: calculateTotalPrice(startDate, endDate, product.pricePerDay),
            productBooked: productId,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then((response) => {
          setBookingConfirmed(true);
        //   const updatedProduct = [...product];
        //   updatedProduct.bookedDates.push({
        //     startDate,
        //     endDate,
        //   });
        //   setProduct(updatedProduct);
        

        setBooked(response.data.savedBooking)
        setOwner(response.data.productToUpdate.contactDetails)
        console.log(response)
        })
        .catch((error) => {
          console.error("Error creating booking:", error);
          setIsAvailable(false);
        });
    };
  
    const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      return daysDiff * pricePerDay;
    };
  
    return (
      <div className="RentingPageContainer">
        {bookingConfirmed ? (
          <div className="BookingConfirmation">
            <h2>Your music sounds better with us!</h2>
            <p>Thank you for choosing us for your musical rental!</p>
            <div className="BookingDetails">
              <h3>Booking Details</h3>
              <p>Product: {product.productName}</p>
              <img src={product.mediaUrl} alt={product.productName} />
              <p>Dates: {startDate.toDateString()} to {endDate.toDateString()}</p>
              <p>Total Price: {calculateTotalPrice(startDate, endDate, product.pricePerDay)} EUR</p>
              <p>Contact Details: {owner} </p>
              {/* <p>Contact Details: {product.owner && product.owner.contactDetails}</p> */}
            </div>
            <div className="BtnWrapper">
                <Link to={`/products`}>
                    <button>Keep exploring</button>
                </Link>
            </div>
          </div>
        ) : (
          <div className="ProductDetails">
            <h2>{product.productName}</h2>
            <img src={product.mediaUrl} alt={product.productName} />
            <p>{product.description}</p>
            <div className="DatePickers">
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                placeholderText="Select start date"
                required
              />
  
              <label>End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                placeholderText="Select end date"
                required
              />
            </div>
            {!isAvailable && <p>Dates are not available</p>}
            <button onClick={handleConfirmBooking}>Confirm Booking</button>
          </div>
        )}
      </div>
    );
}


export default RentingPage;