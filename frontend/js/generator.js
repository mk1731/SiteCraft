function generateWebsite(name, category, data) {

/* ===== FIXED NAVBAR SCRIPT ===== */
const script = `
<script>
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.onclick = function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target){
      target.scrollIntoView({behavior:"smooth"});
    }
  }
});
</script>
`;

/* ================= SHOP ================= */
if(category==="shop"){

let itemsHTML = data.items.map(item=>{
  if(!item.title) return "";
  return `
  <div class="card">
    ${item.img ? `<img src="${item.img}">` : ""}
    <h3>${item.title}</h3>
    <p>₹${item.price||""}</p>
    <p>${item.desc||""}</p>
  </div>`;
}).join("");

return `
<!DOCTYPE html>
<html>
<head>
<title>${name}</title>

<style>
body{
margin:0;
font-family:sans-serif;
background:linear-gradient(135deg,#f1f5f9,#e0f2fe);
color:#0f172a;
}

/* NAVBAR */
.nav{
display:flex;
justify-content:space-between;
align-items:center;
padding:20px 40px;
background:rgba(255,255,255,0.7);
backdrop-filter:blur(10px);
position:sticky;
top:0;
z-index:100;
}
.nav a{
margin-left:20px;
text-decoration:none;
color:#0f172a;
font-weight:500;
}

/* HERO */
.hero{
height:70vh;
display:flex;
justify-content:center;
align-items:center;
position:relative;
overflow:hidden;
}
.hero img{
position:absolute;
width:100%;
height:100%;
object-fit:cover;
filter:blur(8px);
}
.hero h1{
position:relative;
color:white;
font-size:60px;
}

/* SECTION */
.section{
padding:60px 20px;
text-align:center;
}

.grid{
display:flex;
justify-content:center;
flex-wrap:wrap;
gap:20px;
}

/* CARD */
.card{
background:white;
padding:20px;
border-radius:15px;
width:280px;
box-shadow:0 4px 20px rgba(0,0,0,0.1);
}

.about-card{
background:white;
padding:20px;
border-radius:15px;
max-width:600px;
margin:auto;
}

footer{
text-align:center;
padding:20px;
background:#e2e8f0;
}
</style>
</head>

<body>

<div class="nav">
<h2>${name}</h2>
<div>
<a href="dashboard.html" onclick="window.parent.location.href='dashboard.html'">Dashboard</a>
<a href="#products">Products</a>
<a href="#about">About Us</a>
<a href="#contact">Contact Us</a>
</div>
</div>

<div class="hero">
${data.items[0]?.img ? `<img src="${data.items[0].img}">` : ""}
<h1>${name}</h1>
</div>

<div id="products" class="section">
<h2>Our Products</h2>
<div class="grid">${itemsHTML}</div>
</div>

<div id="about" class="section">
<h2>About Us</h2>
<div class="about-card">${data.desc||""}</div>
</div>

<div id="contact" class="section">
<h2>Contact Us</h2>
<p>${data.email||""}</p>
<p>${data.phone||""}</p>
<p>${data.address||""}</p>
</div>

<footer>© SiteCraft</footer>

${script}

</body>
</html>
`;
}

/* ================= PORTFOLIO ================= */
if (category === "portfolio") {

let educationHTML = data.education.map(e => `
  <div class="card">
    <h3>${e.inst || ""}</h3>
    <p>${e.from || ""} - ${e.to || ""}</p>
  </div>
`).join("");

let projectsHTML = data.items.map(p => `
  <div class="card">
    <h3>${p.title || ""}</h3>
    <p>${p.desc || ""}</p>
    ${p.price ? `<a href="${p.price}" target="_blank">Visit</a>` : ""}
  </div>
`).join("");

let socialHTML = data.social.map(link =>
  `<a href="${link}" target="_blank">${link}</a>`
).join("<br>");

return `
<!DOCTYPE html>
<html>
<head>
<title>${name}</title>

<style>
body{
margin:0;
font-family:sans-serif;
background:#f1f5f9;
}

/* NAVBAR (FIXED) */
.nav{
position:fixed;
top:0;
left:0;
width:100%;
height:60px;
background:white;
display:flex;
justify-content:space-between;
align-items:center;
padding:0 30px;
box-shadow:0 2px 10px rgba(0,0,0,0.1);
z-index:1000;
}

.nav a{
margin-left:20px;
text-decoration:none;
color:#0f172a;
font-weight:500;
}

/* MAIN LAYOUT */
.container{
display:flex;
margin-top:60px;
}

/* LEFT SIDEBAR */
.left{
width:40%;
height:calc(100vh - 60px);
position:fixed;
top:60px;
left:0;
background:white;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
box-shadow:2px 0 10px rgba(0,0,0,0.05);
}

.profile-img{
width:250px;
height:250px;
border-radius:50%;
object-fit:cover;
margin-bottom:20px;
}

/* RIGHT CONTENT */
.right{
margin-left:40%;
width:60%;
padding:40px;
}

/* SECTIONS */
.section{
margin-bottom:50px;
}

.section h2{
margin-bottom:20px;
}

/* CARD */
.card{
background:white;
padding:20px;
border-radius:12px;
margin-bottom:20px;
box-shadow:0 4px 15px rgba(0,0,0,0.1);
}

/* CONTACT CARDS */
.contact-card{
background:white;
padding:15px;
border-radius:10px;
margin-bottom:10px;
width:fit-content;
box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

/* SOCIAL */
.social a{
color:#2563eb;
text-decoration:none;
}

/* FOOTER */
footer{
text-align:center;
padding:20px;
background:#e2e8f0;
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
<h2>${name}</h2>
<div>
<a href="dashboard.html" onclick="window.parent.location.href='dashboard.html'">Dashboard</a>
<a href="#info">Personal Info</a>
<a href="#education">Education</a>
<a href="#projects">Projects</a>
</div>
</div>

<div class="container">

<!-- LEFT SIDE -->
<div class="left">
${data.logo ? `<img src="${data.logo}" class="profile-img">` : ""}
<h2>${name}</h2>
</div>

<!-- RIGHT SIDE -->
<div class="right">

<div id="info" class="section">
<h2>Personal Info</h2>
<div class="card">
<p><b>Name:</b> ${name}</p>
<p><b>Gender:</b> ${data.gender || ""}</p>
<p><b>DOB:</b> ${data.dob || ""}</p>
<p><b>About:</b> ${data.desc || ""}</p>
</div>
</div>

<div id="education" class="section">
<h2>Education</h2>
${educationHTML}
</div>

<div id="projects" class="section">
<h2>Projects</h2>
${projectsHTML}
</div>

<div id="contact" class="section">
<h2>Contact</h2>
<div class="contact-card">${data.email || ""}</div>
<div class="contact-card">${data.phone || ""}</div>
</div>

<div class="section social">
<h2>Social</h2>
${socialHTML || "No links added"}
</div>

</div>
</div>

<footer>© SiteCraft</footer>

<script>
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.onclick = function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target){
      target.scrollIntoView({behavior:"smooth"});
    }
  }
});
</script>

</body>
</html>
`;
}

/* ================= BUSINESS ================= */
if(category==="business"){

let servicesHTML = data.items.map(s=>{
  if(!s.title) return "";
  return `
  <div class="card">
    <h3>${s.title}</h3>
    <p>${s.desc||""}</p>
  </div>`;
}).join("");

return `
<!DOCTYPE html>
<html>
<head>
<title>${name}</title>

<style>
body{
margin:0;
font-family:sans-serif;
background:linear-gradient(135deg,#f1f5f9,#e0f2fe);
color:#0f172a;
}

.nav{
display:flex;
justify-content:space-between;
padding:20px 40px;
background:white;
position:sticky;
top:0;
}
.nav a{
margin-left:20px;
text-decoration:none;
color:#0f172a;
}

.hero{
height:60vh;
display:flex;
justify-content:center;
align-items:center;
position:relative;
}
.hero img{
position:absolute;
width:100%;
height:100%;
object-fit:cover;
filter:blur(8px);
}
.hero h1{
position:relative;
color:white;
font-size:50px;
}

.section{
padding:50px;
text-align:center;
}

.grid{
display:flex;
justify-content:center;
flex-wrap:wrap;
gap:20px;
}

.card{
background:white;
padding:20px;
border-radius:12px;
width:260px;
}

footer{
text-align:center;
padding:20px;
background:#e2e8f0;
}
</style>
</head>

<body>

<div class="nav">
<h2>${name}</h2>
<div>
<a href="dashboard.html" onclick="window.parent.location.href='dashboard.html'">Dashboard</a>
<a href="#services">Services</a>
<a href="#about">About Us</a>
<a href="#contact">Contact Us</a>
</div>
</div>

<div class="hero">
${data.banner ? `<img src="${data.banner}">` : ""}
<h1>${name}</h1>
</div>

<div id="services" class="section">
<h2>Our Services</h2>
<div class="grid">${servicesHTML}</div>
</div>

<div id="about" class="section">
<h2>About Us</h2>
<p>${data.desc||""}</p>
</div>

<div id="contact" class="section">
<h2>Contact Us</h2>
<p>${data.email||""}</p>
<p>${data.phone||""}</p>
</div>

<footer>© SiteCraft</footer>

${script}

</body>
</html>
`;
}

return "<h1>Coming Soon</h1>";
}