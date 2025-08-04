const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

/// extra for testing



function setupRecaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log('Recaptcha solved');
      }
    });
  }
  
  function sendOTP() {
    setupRecaptcha();
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appVerifier = window.recaptchaVerifier;
  
    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert('OTP sent!');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
        console.error('Error during phone authentication:', error);
      });
  }
  
  function verifyOTP() {
    const code = document.getElementById('otpCode').value;
    window.confirmationResult.confirm(code)
      .then((result) => {
        const user = result.user;
        alert('Phone number verified successfully!');
        console.log('Phone user signed in:', user);
      })
      .catch((error) => {
        alert('Error: ' + error.message);
        console.error('Error verifying OTP:', error);
      });
  }