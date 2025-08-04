// Initialize EmailJS
(function() {
    emailjs.init('tC5t4jcqVJj1BD0tf');  // Replace 'YOUR_USER_ID' with your EmailJS user ID
})();

// Handle form submission and payment simulation
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userEmail = document.getElementById('email').value;
    
    // Simulating a successful payment here
    setTimeout(() => {
        document.getElementById('paymentStatus').innerText = "Payment successful! Sending your ticket...";

        // Send ticket email after payment
        sendTicketEmail(userEmail);
    }, 2000);  // Simulate payment process delay
});

// Function to send the email
function sendTicketEmail(userEmail) {
    const ticketDetails = 'Your ticket for the event: Event Name. Your seat is reserved!';
    
    const templateParams = {
        user_email: userEmail,
        ticket: ticketDetails
    };

    emailjs.send('service_gt8uink', 'template_appp7jc', templateParams)
        .then(function(response) {
            document.getElementById('paymentStatus').innerText = "Ticket sent to your email!";
            console.log('SUCCESS!', response);
        }, function(error) {
            document.getElementById('paymentStatus').innerText = "Failed to send ticket. Please try again.";
            console.log('FAILED...', error);
        });
}
