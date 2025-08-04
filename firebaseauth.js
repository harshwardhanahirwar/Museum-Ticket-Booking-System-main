// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
// 
const firebaseConfig = {
  apiKey: "AIzaSyD740zoccCTlMESALw-1VxsZjfjxlGBApQ",
  authDomain: "mini-project-v.firebaseapp.com",
  projectId: "mini-project-v",
  storageBucket: "mini-project-v.firebasestorage.app",
  messagingSenderId: "57541657017",
  appId: "1:57541657017:web:3750490184bf499eff3668"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Show message helper function
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign Up Event Listener
document.getElementById('submitSignUp').addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      return setDoc(doc(db, "users", user.uid), userData);
    })
    .then(() => {
      window.location.href = 'Main.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to Create User', 'signUpMessage');
      }
    });
});

// Sign In Event Listener
document.getElementById('submitSignIn').addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Login is Successful', 'signInMessage');
      window.location.href = 'Main.html';
      // window.location.href = 'ticket.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        showMessage('Incorrect Password', 'signInMessage');
      } else if (errorCode === 'auth/user-not-found') {
        showMessage('Account Does Not Exist', 'signInMessage');
      } else {
        showMessage('Login Failed', 'signInMessage');
      }
    });
});
