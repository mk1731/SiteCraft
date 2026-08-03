import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// 🔥 SHOW USER NAME
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.displayName || "User";
    document.getElementById("welcomeText").innerText = `Welcome ${name} 👋`;
  } else {
    // not logged in → redirect
    window.location.href = "login.html";
  }
});

// ================= YOUR EXISTING CODE =================

const projects = JSON.parse(localStorage.getItem("projects")) || [];

const container = document.getElementById("projects");

function renderProjects() {
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = `       <div class="empty-state">         <h2>No Websites Yet</h2>         <p>Create your first website 🚀</p>       </div>
    `;
    return;
  }

  projects.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "project";


    div.innerHTML = `
  <h3>${p.name}</h3>
  <p>Category: ${p.category}</p>

  <div class="project-actions">
    <button onclick="openPreview(${i})">Preview</button>
    <button onclick="deleteProject(${i})" style="background:#ef4444;">
      Delete
    </button>
  </div>
`;

container.appendChild(div);
``

  });
}

function openPreview(i) {
  localStorage.setItem("currentProject", i);
  window.location.href = "preview.html";
}

function deleteProject(index) {
  const confirmDelete = confirm("Are you sure you want to delete this project?");

  if (!confirmDelete) return;

  projects.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects));

  renderProjects();
}

renderProjects();
