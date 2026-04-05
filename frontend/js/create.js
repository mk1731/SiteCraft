const category = document.getElementById("category");
const dynamic = document.getElementById("dynamicFields");

category.addEventListener("change", () => {
  dynamic.innerHTML = `
    <h3>Items</h3>
    <div id="items"></div>
    <button type="button" onclick="addItem()">+ Add Item</button>
  `;
});

function addItem() {
  const container = document.getElementById("items");

  const div = document.createElement("div");

  div.style.background = "rgba(255,255,255,0.05)";
  div.style.padding = "15px";
  div.style.borderRadius = "10px";
  div.style.marginBottom = "15px";

  div.innerHTML = `
    <input placeholder="Product / Project Title">

    <div style="position:relative; margin:10px 0;">
      <span style="
        position:absolute;
        left:10px;
        top:50%;
        transform:translateY(-50%);
        color:#94a3b8;">₹</span>

      <input type="number" min="0" step="1"
        style="width:100%; padding-left:30px;">
    </div>

    <input placeholder="Description">

    <label style="
      display:block;
      background:#1e293b;
      padding:12px;
      border-radius:8px;
      cursor:pointer;
      margin-top:10px;
      text-align:center;">
      Upload Image
      <input type="file" style="display:none;">
    </label>
  `;

  container.appendChild(div);
}

function addSocial() {
  const input = document.createElement("input");
  input.placeholder = "Social Link";
  document.getElementById("socialContainer").appendChild(input);
}

function toBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
}

async function collectItems() {
  const items = [];
  const divs = document.querySelectorAll("#items > div");

  for (let div of divs) {
    const inputs = div.querySelectorAll("input");

    let img = "";
    const file = inputs[3].files[0];
    if (file) img = await toBase64(file);

    items.push({
      title: inputs[0].value,
      price: inputs[1].value,
      desc: inputs[2].value,
      img
    });
  }

  return items;
}

document.getElementById("createForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const logoFile = document.getElementById("logo").files[0];
  let logo = "";
  if (logoFile) logo = await toBase64(logoFile);

  const items = await collectItems();

  const metadata = {
    name: document.getElementById("websiteName").value,
    tagline: document.getElementById("tagline").value,
    description: document.getElementById("description").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    social: Array.from(document.querySelectorAll("#socialContainer input")).map(i => i.value),
    category: category.value,
    items,
    logo
  };

  const html = generateWebsite(metadata.name, metadata.category, metadata);

  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.push({
    name: metadata.name,
    category: metadata.category,
    html,
    created: new Date().toLocaleDateString()
  });

  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("currentProject", projects.length - 1);

  window.location.href = "preview.html";
});