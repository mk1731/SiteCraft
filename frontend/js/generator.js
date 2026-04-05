function generateWebsite(name, category, data) {

  let itemsHTML = "";

  data.items.forEach(item => {
    itemsHTML += `
      <div class="card">
        ${item.img ? `<img src="${item.img}" />` : ""}
        <div class="card-body">
          <h3>${item.title}</h3>
          ${item.price ? `<p class="price">₹${item.price}</p>` : ""}
          <p>${item.desc}</p>
        </div>
      </div>
    `;
  });

  const socialLinks = data.social
    .map(link => `<a href="${link}" target="_blank">🔗</a>`)
    .join(" ");

  return `
<!DOCTYPE html>
<html>
<head>
<title>${name}</title>

<style>
*{margin:0;padding:0;box-sizing:border-box;}

body{
  font-family:'Segoe UI',sans-serif;
  background:#f8fafc;
  color:#1e293b;
}

/* NAVBAR (GLASS EFFECT) */
.navbar{
  position:sticky;
  top:0;
  backdrop-filter:blur(10px);
  background:rgba(255,255,255,0.7);
  padding:15px 50px;
  display:flex;
  justify-content:space-between;
  border-bottom:1px solid #e2e8f0;
  z-index:100;
}

.navbar h2{
  color:#3b82f6;
}

/* HERO */
.hero{
  text-align:center;
  padding:100px 20px;
  background:linear-gradient(135deg,#6366f1,#3b82f6);
  color:white;
}

.hero img{
  width:110px;
  height:110px;
  border-radius:50%;
  object-fit:cover;
  border:4px solid white;
  margin-bottom:15px;
}

.hero h1{
  font-size:42px;
  margin-bottom:10px;
}

.hero p{
  font-size:18px;
  opacity:0.9;
}

/* ABOUT */
.about{
  padding:70px 20px;
  text-align:center;
  max-width:800px;
  margin:auto;
  font-size:18px;
  line-height:1.6;
}

/* SECTION */
.section{
  padding:70px 20px;
}

.section h2{
  text-align:center;
  font-size:30px;
  margin-bottom:50px;
}

/* GRID */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:30px;
  max-width:1100px;
  margin:auto;
}

/* CARD (PREMIUM) */
.card{
  background:white;
  border-radius:16px;
  overflow:hidden;
  box-shadow:0 15px 35px rgba(0,0,0,0.08);
  transition:0.3s;
}

.card:hover{
  transform:translateY(-8px) scale(1.02);
}

.card img{
  width:100%;
  height:180px;
  object-fit:cover;
}

/* CARD BODY */
.card-body{
  padding:20px;
  text-align:center;
}

.price{
  color:#3b82f6;
  font-weight:bold;
  margin:8px 0;
  font-size:18px;
}

/* FOOTER */
footer{
  background:#0f172a;
  color:white;
  padding:50px 20px;
  text-align:center;
  margin-top:60px;
}

footer a{
  color:#60a5fa;
  margin:0 10px;
  font-size:20px;
  transition:0.2s;
}

footer a:hover{
  color:white;
}
</style>

</head>

<body>

<!-- NAVBAR -->
<div class="navbar">
  <h2>${name}</h2>
</div>

<!-- HERO -->
<div class="hero">
  ${data.logo ? `<img src="${data.logo}">` : ""}
  <h1>${name}</h1>
  <p>${data.tagline || ""}</p>
</div>

<!-- ABOUT -->
<div class="about">
  <p>${data.description || ""}</p>
</div>

<!-- SECTION -->
<div class="section">
  <h2>${
    category === "shop"
      ? "Our Products"
      : category === "portfolio"
      ? "Our Work"
      : "Our Services"
  }</h2>

  <div class="grid">
    ${itemsHTML}
  </div>
</div>

<!-- FOOTER -->
<footer>
  <p>${data.email || ""}</p>
  <p>${data.phone || ""}</p>
  <p>${data.address || ""}</p>
  <div>${socialLinks}</div>
</footer>

</body>
</html>
`;
}