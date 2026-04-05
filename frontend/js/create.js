const category = document.getElementById("category");
const form = document.getElementById("form");

/* ================= CATEGORY ================= */

category.addEventListener("change", () => {
  form.style.display = "block";
  form.innerHTML = "";

  if (category.value === "shop") renderShop();
  if (category.value === "portfolio") renderPortfolio();
  if (category.value === "business") renderBusiness();
});

/* ================= SHOP ================= */

function renderShop() {
  form.innerHTML = `
    <input id="name" placeholder="Shop Name" required>
    <input type="file" id="logo">
    <input id="tagline" placeholder="Tagline">
    <input id="desc" placeholder="Description">
    <input id="email" placeholder="Email">
    <input id="phone" placeholder="Phone">
    <input id="address" placeholder="Address">

    <h3>Social Links</h3>
    <div id="social"></div>
    <button type="button" onclick="addSocial()">+ Add Social</button>

    <h3>Products</h3>
    <div id="items"></div>
    <button type="button" onclick="addProduct()">+ Add Product</button>

    <button type="button" onclick="submitForm(event)">Create Website</button>
  `;
}

/* ================= PORTFOLIO ================= */

function renderPortfolio() {
  form.innerHTML = `
    <input type="file" id="UserImg">

    <input id="name" placeholder="Your Name">
    <input type="date" id="dob">

    <select id="gender">
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
    </select>

    <input id="desc" placeholder="About Yourself">

    <h3>Education</h3>
    <div id="education"></div>
    <button type="button" onclick="addEducation()">+ Add Education</button>

    <h3>Contact</h3>
    <input id="email" placeholder="Email">
    <input id="phone" placeholder="Phone">

    <h3>Social Links</h3>
    <div id="social"></div>
    <button type="button" onclick="addSocial()">+ Add Social</button>

    <h3>Projects</h3>
    <div id="items"></div>
    <button type="button" onclick="addProject()">+ Add Project</button>

    <button type="button" onclick="submitForm(event)">Create Website</button>
  `;
}

/* ================= BUSINESS ================= */

function renderBusiness() {
  form.innerHTML = `
    <input id="name" placeholder="Business Name">
    <input id="desc" placeholder="Description">
    <input id="email" placeholder="Email">
    <input id="phone" placeholder="Phone">

    <h3>Services</h3>
    <div id="items"></div>
    <button type="button" onclick="addService()">+ Add Service</button>

    <button type="button" onclick="submitForm(event)">Create Website</button>
  `;
}

/* ================= ADD FUNCTIONS ================= */

function addSocial() {
  const input = document.createElement("input");
  input.placeholder = "Social Link";
  document.getElementById("social").appendChild(input);
}

function addProduct() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input type="file">
    <input placeholder="Product Name">
    <input placeholder="Description">
    <input type="number" placeholder="Price">
  `;

  document.getElementById("items").appendChild(div);
}

function addProject() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input placeholder="Project Name">
    <input placeholder="Description">
    <input placeholder="Website Link">
  `;

  document.getElementById("items").appendChild(div);
}

function addService() {
  const input = document.createElement("input");
  input.placeholder = "Service Name";
  document.getElementById("items").appendChild(input);
}

function addEducation() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input placeholder="Institute">
    <input placeholder="From Year">
    <input placeholder="To Year / Present">
  `;

  document.getElementById("education").appendChild(div);
}

/* ================= BASE64 ================= */

function toBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
}

/* ================= SUBMIT ================= */

async function submitForm(e) {
  e.preventDefault();

  const categoryType = category.value;

  const data = {
    name: document.getElementById("name")?.value,
    tagline: document.getElementById("tagline")?.value,
    desc: document.getElementById("desc")?.value,
    email: document.getElementById("email")?.value,
    phone: document.getElementById("phone")?.value,
    address: document.getElementById("address")?.value,
    social: [],
    items: [],
    education: [],
    gender: document.getElementById("gender")?.value,
    dob: document.getElementById("dob")?.value
  };

  /* USER IMAGE (PORTFOLIO) */
  const userImgFile = document.getElementById("UserImg")?.files[0];
  if (userImgFile) data.logo = await toBase64(userImgFile);

  /* SHOP LOGO */
  const logoFile = document.getElementById("logo")?.files[0];
  if (logoFile) data.logo = await toBase64(logoFile);

  /* SOCIAL */
  document.querySelectorAll("#social input").forEach(i => {
    if (i.value) data.social.push(i.value);
  });

  /* EDUCATION */
  document.querySelectorAll("#education > div").forEach(div => {
    const inputs = div.querySelectorAll("input");

    data.education.push({
      inst: inputs[0]?.value,
      from: inputs[1]?.value,
      to: inputs[2]?.value
    });
  });

  /* ITEMS */
  const itemDivs = document.querySelectorAll("#items > div");

  for (let div of itemDivs) {
    const inputs = div.querySelectorAll("input");

    let img = "";
    if (inputs[0]?.files?.[0]) {
      img = await toBase64(inputs[0].files[0]);
    }

    data.items.push({
      img,
      title: inputs[1]?.value,
      desc: inputs[2]?.value,
      price: inputs[3]?.value
    });
  }

  /* GENERATE */
  const html = generateWebsite(data.name, categoryType, data);

  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.push({
    name: data.name,
    category: categoryType,
    html
  });

  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("currentProject", projects.length - 1);

  window.location.href = "preview.html";
}