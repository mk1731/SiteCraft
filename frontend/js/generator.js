function generateWebsite(name, category, data) {

  /* ================= SHOP ================= */
  if (category === "shop") {

    let itemsHTML = "";

    data.items.forEach(item => {
      itemsHTML += `
        <div class="card">
          ${item.img ? `<img src="${item.img}" />` : ""}
          <div class="card-body">
            <h3>${item.title}</h3>
            <p class="price">₹${item.price}</p>
            <p>${item.desc}</p>
          </div>
        </div>
      `;
    });

    const socialLinks = data.social
      .map(link => `<a href="${link}" target="_blank">🔗</a>`)
      .join("");

    return `
<!DOCTYPE html>
<html>
<head>
  <title>${name}</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    html{scroll-behavior:smooth;}
  </style>
</head>

<body>

<div class="shop-navbar">
  <div class="shop-left">
    ${data.logo ? `<img src="${data.logo}" class="shop-logo">` : ""}
    <h2>${name}</h2>
  </div>

  <div class="shop-right">
    <a href="#home">Home</a>
    <a href="#products">Products</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
    <a href="mailto:${data.email}">Email</a>
  </div>
</div>

<div id="home" class="shop-hero">
  ${data.items[0]?.img ? `<img src="${data.items[0].img}" class="hero-banner">` : ""}
  <h1 class="hero-title">${name}</h1>
  <p class="hero-tagline">${data.tagline || ""}</p>
</div>

<div id="products" class="shop-section">
  <h2>Our Products</h2>
  <div class="shop-grid">${itemsHTML}</div>
</div>

<div id="about" class="shop-section">
  <h2>About Us</h2>
  <p>${data.desc || ""}</p>
</div>

<div id="contact" class="shop-section">
  <h2>Contact Us</h2>
  <p>${data.email}</p>
  <p>${data.phone}</p>
  <p>${data.address}</p>
</div>

<div class="shop-section">
  <h2>Follow Us</h2>
  <div class="shop-social">${socialLinks}</div>
</div>

<footer class="shop-footer">
  <p>© SiteCraft</p>
</footer>

</body>
</html>
`;
  }

  /* ================= PORTFOLIO ================= */
  if (category === "portfolio") {

    let projectsHTML = "";

    data.items.forEach(p => {
      projectsHTML += `
        <div class="portfolio-card">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          ${p.price ? `<a href="${p.price}" target="_blank">Visit Project</a>` : ""}
        </div>
      `;
    });

    const socialLinks = data.social
      .map(link => `<a href="${link}" target="_blank">🔗</a>`)
      .join("");

    return `
<!DOCTYPE html>
<html>
<head>
<title>${name}</title>
<link rel="stylesheet" href="css/style.css">

<style>
html{scroll-behavior:smooth;}

/* FORCE DARK THEME (FIX WHITE ISSUE) */
body {
  background: #0f172a;
  color: #e2e8f0;
}

/* FIXED NAVBAR */
.portfolio-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: #020617;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
}

.portfolio-navbar a {
  color: #cbd5f5;
  margin-left: 20px;
  text-decoration: none;
}

/* LAYOUT */
.portfolio-container {
  display: flex;
  margin-top: 60px;
}

/* LEFT */
.portfolio-left {
  width: 30%;
  position: fixed;
  height: 100vh;
  background: #020617;
  text-align: center;
  padding: 40px 20px;
}

.profile-img {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

/* RIGHT */
.portfolio-right {
  margin-left: 30%;
  width: 70%;
  padding: 40px;
}

/* SECTIONS */
.portfolio-right section {
  background: #1e293b;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

/* GRID */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  gap: 20px;
}

/* CARD */
.portfolio-card {
  background: #334155;
  padding: 20px;
  border-radius: 10px;
}

.portfolio-card h3 {
  margin-bottom: 10px;
}

.portfolio-card a {
  color: #38bdf8;
  text-decoration: none;
}

/* FOOTER */
.portfolio-footer {
  text-align: center;
  padding: 20px;
  background: #020617;
}
</style>

</head>

<body>

<div class="portfolio-navbar">
  <div>${name}</div>
  <div>
    <a href="#info">Info</a>
    <a href="#education">Education</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </div>
</div>

<div class="portfolio-container">

  <div class="portfolio-left">
    ${data.logo ? `<img src="${data.logo}" class="profile-img">` : ""}
    <h2>${name}</h2>
  </div>

  <div class="portfolio-right">

    <section id="info">
      <h2>General Info</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Gender:</strong> ${data.gender || ""}</p>
      <p><strong>DOB:</strong> ${data.dob || ""}</p>
      <p>${data.desc || ""}</p>
    </section>

    <section id="education">
      <h2>Education</h2>
      ${(data.education || []).map(e => `
        <div>
          <p><strong>${e.inst}</strong></p>
          <p>${e.from} - ${e.to}</p>
        </div>
      `).join("")}
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <div class="portfolio-grid">
        ${projectsHTML}
      </div>
    </section>

    <section id="portfolio-contact">
      <h2>Contact Me</h2>
      <p>${data.email}</p>
      <p>${data.phone}</p>
      <div>${socialLinks}</div>
    </section>

  </div>

</div>

<footer class="portfolio-footer">
  <p>© SiteCraft</p>
</footer>

</body>
</html>
`;
  }

  return `<h1>Template coming soon</h1>`;
}