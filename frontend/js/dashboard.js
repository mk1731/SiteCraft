const projects = JSON.parse(localStorage.getItem("projects")) || [];

const container = document.getElementById("projects");

function renderProjects() {
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>No Websites Yet</h2>
        <p>Create your first website 🚀</p>
      </div>
    `;
    return;
  }

  projects.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "project";

    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Created: ${p.created}</p>

      <div class="project-actions">
        <button onclick="openPreview(${i})">Preview</button>
        <button onclick="deleteProject(${i})" style="background:#ef4444;">
          Delete
        </button>
      </div>
    `;

    container.appendChild(div);
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

  renderProjects(); // refresh UI
}

renderProjects();