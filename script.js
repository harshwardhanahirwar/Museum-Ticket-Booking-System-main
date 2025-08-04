// Update Total Calculation
function updateTotal() {
    const ticketType = document.querySelector('#opt').value;
    const visitorsCount = document.querySelector('#hh').value;
    const totalDisplay = document.querySelector('#total-display');

    // Define ticket prices
    const ticketPrices = {
        "General Entry": 100,
        "Student": 50,
        "Family Pass": 200,
        "Premium": 500
    };

    const pricePerTicket = ticketPrices[ticketType] || 0;
    const totalAmount = pricePerTicket * (parseInt(visitorsCount) || 0);

    totalDisplay.innerText = totalAmount > 0 ? `${totalAmount} ₹` : "00 ₹";
}

// Add Event Listeners for Real-Time Updates
document.querySelector('#opt').addEventListener('change', updateTotal);
document.querySelector('#hh').addEventListener('input', updateTotal);

// Razorpay Integration
document.getElementById('rzp-button').addEventListener('click', function () {
    const totalDisplay = document.querySelector('#total-display').innerText;
    const totalAmount = parseInt(totalDisplay.replace(' ₹', '')) * 100; // Convert to paise

    if (!totalAmount || totalAmount <= 0) {
        alert("Please fill out ticket and visitor details to proceed.");
        return;
    }

    const options = {
        key: "rzp_test_km48NHtEODzhWJ", // Replace with your Razorpay API Key
        amount: totalAmount, // Amount in paise
        currency: "INR",
        name: "Museum Ticket Payment",
        description: "Ticket Booking",
        handler: function (response) {
            alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);

            // Save the ticket details to localStorage
            const ticketType = document.getElementById('opt').value;
            const location = document.querySelector('select[name="Location"]').value;
            const date = document.querySelector('input[type="date"]').value;
            const visitors = document.getElementById('hh').value;
            const totalPrice = document.getElementById('total-display').innerText;

            if (!ticketType || !location || !date || !visitors || !totalPrice) {
                alert("Ensure all fields are filled correctly.");
                return;
            }

            localStorage.setItem('ticketType', ticketType);
            localStorage.setItem('location', location);
            localStorage.setItem('date', date);
            localStorage.setItem('visitors', visitors);
            localStorage.setItem('totalPrice', totalPrice);

            console.log("Data saved to localStorage:", {
                ticketType,
                location,
                date,
                visitors,
                totalPrice,
            });

            // Redirect to ticket page
            window.location.href = 'ticket.html';
        },
        prefill: {
            name: "Ajay Singh",
            email: "ajaysingh1438970@gmail.com",
            contact: "9651298145",
        },
        theme: {
            color: "#F37254",
        },
    };

    const rzp = new Razorpay(options);
    rzp.open();
});

// Price configuration (You can adjust prices as needed)
const prices = {
    "General Entry": 100,
    "Student": 50,
    "Family Pass": 300,
    "Premium": 500
};

// Pricing multipliers based on location
const locationMultiplier = {
    "Kiran Nadar Museum of Art": 1,
    "Jio World Convention Centre": 1.2,
    "National Museum New Delhi": 1.1,
    "Indian Museum Kolkata": 1.15
};

// Calculate the total price dynamically
function calculateTotal() {
    const ticketType = document.getElementById('opt').value;
    const location = document.querySelector('select[name="select ticket"]').value;
    const visitors = document.getElementById('hh').value;

    const ticketPrice = prices[ticketType] || 100; // Default price is 100 if no match
    const locationMultiplierValue = locationMultiplier[location] || 1;

    const total = ticketPrice * (parseInt(visitors) || 0) * locationMultiplierValue;

    document.getElementById('total-display').textContent = total > 0 ? `${total} ₹` : "00 ₹";
}

// Event listeners for changes
document.getElementById('opt').addEventListener('change', calculateTotal);
document.querySelector('select[name="select ticket"]').addEventListener('change', calculateTotal);
document.getElementById('hh').addEventListener('input', calculateTotal);

// Initially calculate total on page load
window.onload = calculateTotal;
