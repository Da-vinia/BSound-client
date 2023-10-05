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
      <div className="container">
      <div className="RentingPageContainer">
        {bookingConfirmed ? (
          <div className="BookingConfirmation">
            <h2>Thank you for choosing us for your musical rental!</h2>
            <p>Your music sounds better with us!</p>
              <div className="confirmation-wrapper">
                <div className="BookingDetails">
                  <h3>Booking Details</h3>
                  <div className="ProductName-wrapper">
                    <p> {product.productName}</p>
                  </div>
                  <div className="Confirmation-flex">
                      <div className="ConfirmationImage-wrapper">
                      <img src={product.mediaUrl} alt={product.productName} />
                    </div>
                    
                    <div className="ConfirmationDetails-wrapper">
                      <p> Rent From <br />
                        <span> 
                          {startDate.toDateString()} to {endDate.toDateString()}
                        </span>
                      </p>
                      <div className="total-price">
                        <p>Total - {calculateTotalPrice(startDate, endDate, product.pricePerDay)} EUR</p>
                      </div>
                      <div className="contact-details">
                        <p>Contact Details: {owner} </p>
                      </div>
                    </div>
                  </div>
                  {/* <p>Contact Details: {product.owner && product.owner.contactDetails}</p> */}
                </div>
                <div className="BtnWrapper">
                    <Link to={`/products`}>
                        <button>Keep exploring</button>
                    </Link>
                </div>
              </div>
          </div>
        ) : (
          <div className="RentingContainer">
          <h1>Select Reservation Dates</h1>
          <div className="ProductDetails">
            <h2>{product.productName}</h2>
            <div className="booking-img">
              <img src={product.mediaUrl} alt={product.productName} />
            </div>
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
            <div className="non-available-dates">
            {!isAvailable && <p>Dates are not available</p>}
            </div>
            <div className="confirm-btn">
              <button onClick={handleConfirmBooking}>Confirm Booking</button>
            </div>
            </div>
          </div>
        )}
      </div>
      </div>
      
    );
}


export default RentingPage;