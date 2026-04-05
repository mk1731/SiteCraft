function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// LOGIN (temporary direct access)
function goDashboard() {
  window.location.href = "dashboard.html";
}

// SIGNUP FUNCTION (FIXED)
function signupUser() {
  const name = document.querySelector("#signupBox input[type='text']").value;
  const email = document.querySelectorAll("#signupBox input[type='email']")[0].value;
  const password = document.querySelectorAll("#signupBox input[type='password']")[0].value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Save temporary (localStorage)
  localStorage.setItem("user", JSON.stringify({ name, email }));

  alert("Account Created!");

  // Go back to login
  showLogin();
}