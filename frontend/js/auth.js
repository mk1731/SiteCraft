import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
apiKey: "AIzaSyAlBPqVZNQbm7SgaMLOBbqp1TjoWYfcK5c",
authDomain: "sitecraft-b589e.firebaseapp.com",
projectId: "sitecraft-b589e",
storageBucket: "sitecraft-b589e.firebasestorage.app",
messagingSenderId: "448892892784",
appId: "1:448892892784:web:c5fead92c23eb22a6366b5",
measurementId: "G-3TLT2P1QHD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Toggle UI (UNCHANGED)
window.showSignup = function () {
document.getElementById("loginBox").style.display = "none";
document.getElementById("signupBox").style.display = "block";
};

window.showLogin = function () {
document.getElementById("signupBox").style.display = "none";
document.getElementById("loginBox").style.display = "block";
};

// LOGIN (UNCHANGED LOGIC)
window.goDashboard = function () {
const email = document.querySelector("#loginBox input[type='email']").value;
const password = document.querySelector("#loginBox input[type='password']").value;

if (!email || !password) {
alert("Email and Password required!");
return;
}

if (password.length < 6) {
alert("Password must be at least 6 characters!");
return;
}

signInWithEmailAndPassword(auth, email, password)
.then(() => {
window.location.href = "dashboard.html";
})
.catch((error) => {
alert(error.message);
});
};

// SIGNUP (FIXED PROPERLY)
window.signupUser = function () {
const name = document.querySelector("#signupBox input[type='text']").value;
const email = document.querySelectorAll("#signupBox input[type='email']")[0].value;
const password = document.querySelectorAll("#signupBox input[type='password']")[0].value;

if (!name || !email || !password) {
alert("Please fill all the Details!!!!");
return;
}

if (password.length < 6) {
alert("Bro, password must be at least 6 characters!");
return;
}

createUserWithEmailAndPassword(auth, email, password)
.then(async (userCredential) => {
const user = userCredential.user;

  // ✅ FIXED: wait for profile update
  await updateProfile(user, {
    displayName: name
  });

  alert("Yayy Your Account Has BeenCreated!");
  showLogin();
})
.catch((error) => {
  alert(error.message);
});

};
