require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const patientRoute=require('./routes/patient')
const session=require('express-session');
const {addWeeks}=require('date-fns')
const port=process.env.PORT || 2000;
const cors=require('cors')
const sessionStore=require('connect-mongo');





const app=express()

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB connected successfuly !');
    const server=app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });
    const io=require('socket.io')(server);
    io.on('connectio',socket=>{
        console.log('user connected')
    })
 
})


app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    allowedHeaders: "Content-Type",
    credentials:true,
    methods:['GET','POST','PUT','PUCH','DELETE']
}))

app.use(session({
    secret:process.env.SESSION_SECURITY,
    resave:false,
    saveUninitialized:false,
    store:sessionStore.create({
        mongoUrl:process.env.DB_URL
    }),
    cookie:{
        secure:true,
        httpOnly:true,
        maxAge:1000*60*60*24*7
    }
}))



app.use('/api/patient',patientRoute),
// app.use('/',(req,res)=>{
//     res.send(`
        
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Baho Healthcare</title>
//     <style>
//         body {
//             font-family: 'Arial', sans-serif;
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//             line-height: 1.7;
//             color: #333;
//         }

//         header {
//             background-color: #007bff;
//             padding: 1rem 2rem;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             flex-wrap: wrap; /* Make header wrap on small screens */
//         }

//         header .logo {
//             margin: 0;
//             font-size: 1.8rem;
//             color: white;
//             margin-bottom: 1rem; /* Add margin below logo on small screens */
//         }

//         header nav {
//             display: flex; /* Use flexbox for navigation */
//             flex-grow: 1; /* Allow nav to take up remaining space */
//             justify-content: flex-end; /* Push nav to the end (right on large screens) */
//             align-items: center; /* Vertically center nav items */
//             flex-wrap: wrap; /* Allow nav items to wrap */
//         }

//         header nav ul {
//             list-style: none;
//             display: flex;
//             margin: 0;
//             padding: 0;
//             flex-wrap: wrap; /* Allow the list to wrap */
//             justify-content: center; /* center items on small screens */
//         }

//         header nav ul li {
//             margin-left: 1.5rem;
//             margin-top: 0.5rem; /* Add a little top margin for wrapped items */
//         }

//         header nav ul li a {
//             color: white;
//             text-decoration: none;
//             font-weight: 400;
//             transition: color 0.3s ease;
//         }

//         header nav ul li a:hover {
//             color: #f8f9fa;
//         }

//         /* Styles for the hamburger menu */
//         .menu-icon {
//             display: none; /* Hide by default on larger screens */
//             background: none;
//             border: none;
//             color: white;
//             font-size: 1.5rem;
//             cursor: pointer;
//             padding: 0;
//             margin-left: 1rem; /* Add some left margin to the icon */
//         }

//         .menu-icon:focus {
//             outline: none;
//         }

//         /* Styles for the mobile menu */
//         .mobile-menu {
//             display: none;
//             background-color: #007bff;
//             position: absolute;
//             top: 100%;
//             right: 0;
//             left: 0;
//             z-index: 10;
//             padding: 1rem;
//             text-align: center;
//             border-bottom: 2px solid #0056b3;
//         }

//         .mobile-menu.open {
//             display: block;
//         }

//         .mobile-menu ul {
//             list-style: none;
//             padding: 0;
//             margin: 0;
//         }

//         .mobile-menu ul li {
//             margin-bottom: 1rem;
//         }

//         .mobile-menu ul li a {
//             color: white;
//             text-decoration: none;
//             font-size: 1.2rem;
//             font-weight: 400;
//         }

//         .mobile-menu ul li a:hover {
//             color: #f8f9fa;
//         }


//         .hero-section {
//             background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('healthcare-hero.jpg');
//             background-size: cover;
//             background-position: center;
//             color: white;
//             text-align: center;
//             padding: 5rem 2rem;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             height: 80vh;
//         }

//         .hero-section h2 {
//             font-size: 2.8rem;
//             margin-bottom: 1.2rem;
//             font-weight: 500;
//             letter-spacing: -0.02em;
//         }

//         .hero-section p {
//             font-size: 1.3rem;
//             margin-bottom: 2rem;
//             max-width: 80%;
//             line-height: 1.8;
//         }

//         .cta-button {
//             background-color: #28a745;
//             color: white;
//             padding: 1rem 2.5rem;
//             text-decoration: none;
//             border-radius: 5px;
//             font-size: 1.1rem;
//             transition: background-color 0.3s ease;
//             font-weight: 500;
//         }

//         .cta-button:hover {
//             background-color: #218838;
//         }

//         .services-section {
//             padding: 4rem 2rem;
//             text-align: center;
//         }

//         .services-section h2 {
//             font-size: 2.2rem;
//             margin-bottom: 2rem;
//             font-weight: 500;
//             color: #007bff;
//         }

//         .service-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//             gap: 2rem;
//             margin-top: 2rem;
//             justify-content: center;
//         }

//         .service-card {
//             background-color: #ffffff;
//             padding: 2rem;
//             border-radius: 8px;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//             text-align: left;
//             border: 1px solid #ededed;
//         }

//         .service-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
//         }

//         .service-card h3 {
//             margin-bottom: 1.2rem;
//             font-size: 1.5rem;
//             color: #004085;
//             font-weight: 600;
//         }

//         .service-card p {
//             margin-bottom: 0;
//             color: #555;
//             line-height: 1.7;
//         }


//         .contact-section {
//             background-color: #f8f9fa;
//             padding: 4rem 2rem;
//             text-align: center;
//         }

//         .contact-section h2 {
//             font-size: 2.2rem;
//             margin-bottom: 2rem;
//             font-weight: 500;
//             color: #007bff;
//         }


//         .contact-section p {
//             font-size: 1.2rem;
//             margin-bottom: 1rem;
//             color: #333;
//         }

//         footer {
//             background-color: #343a40;
//             color: white;
//             text-align: center;
//             padding: 1.5rem;
//             font-size: 0.9rem;
//         }

//         /* Responsive Media Queries */
//         @media (max-width: 992px) {
//             header nav ul {
//                 flex-direction: column;
//                 align-items: flex-start;
//                 margin-top: 1rem;
//             }

//             header nav ul li {
//                 margin-left: 0;
//                 margin-top: 0.75rem;
//             }
//             header {
//                 flex-direction: column;
//                 align-items: flex-start;
//             }
//             header .logo{
//                 margin-bottom: 1rem;
//             }
//             header nav{
//                 justify-content: space-between; /* Changed from flex-start */
//                 align-items: center;
//                 width: 100%;
//             }
//             .menu-icon {
//                 display: block; /* Show on small screens */
//             }
//             header nav ul{
//                 display: none;
//             }
//             header nav ul.open{
//                 display: flex;
//                 flex-direction: column;
//                 width: 100%;
//             }
//         }

//         @media (max-width: 768px) {
//             .hero-section h2 {
//                 font-size: 2.5rem;
//             }

//             .hero-section p {
//                 font-size: 1.2rem;
//             }
//             .hero-section {
//                 padding: 4rem 2rem;
//             }
//             .services-section {
//                 padding: 3rem 1.5rem;
//             }
//              .contact-section{
//                 padding: 3rem 1.5rem;
//             }
//         }

//         @media (max-width: 576px) {
//             .hero-section h2 {
//                 font-size: 2rem;
//             }

//             .hero-section p {
//                 font-size: 1.1rem;
//             }
//             header {
//                 flex-direction: column;
//                 align-items: center;
//             }
//             header .logo {
//                 margin-bottom: 1rem;
//             }
//             header nav ul {
//                 flex-direction: column;
//                 align-items: center;
//             }
//             header nav ul li{
//                 margin-left: 0;
//                 margin-top: 0.5rem;
//             }
//         }
//     </style>
// </head>
// <body>
//     <header>
//         <h1 class="logo">Baho Healthcare</h1>
//         <nav>
//             <button class="menu-icon" id="menu-icon">&#9776;</button>
//             <ul id="nav-menu">
//                 <li><a href="#">Home</a></li>
//                 <li><a href="#">Services</a></li>
//                 <li><a href="#">About Us</a></li>
//                 <li><a href="#">Contact</a></li>
//             </ul>
//         </nav>
//     </header>
//     <div class="mobile-menu" id="mobile-menu">
//         <ul>
//             <li><a href="#">Home</a></li>
//             <li><a href="#">Services</a></li>
//             <li><a href="#">About Us</a></li>
//             <li><a href="#">Contact</a></li>
//         </ul>
//     </div>

//     <section class="hero-section">
//         <h2>Your Partner in Health & Wellness</h2>
//         <p>We are dedicated to providing exceptional healthcare services with compassion, dignity, and respect.  Your well-being is our top priority.</p>
//         <a href="#" class="cta-button">Explore Our Services</a>
//     </section>

//     <section class="services-section">
//         <h2>Our Comprehensive Services</h2>
//         <div class="service-grid">
//             <div class="service-card">
//                 <h3>Preventive Care</h3>
//                 <p>Regular check-ups, screenings, and vaccinations to maintain optimal health.</p>
//             </div>
//             <div class="service-card">
//                 <h3>Diagnostic Services</h3>
//                 <p>Advanced imaging and laboratory tests for accurate and timely diagnoses.</p>
//             </div>
//             <div class="service-card">
//                 <h3>Specialized Treatments</h3>
//                 <p>Expert care for a wide range of medical conditions by our specialists.</p>
//             </div>
//             <div class="service-card">
//                 <h3>Maternity Care</h3>
//                 <p>Comprehensive care for expectant mothers and newborns.</p>
//             </div>
//             <div class="service-card">
//                 <h3>Pharmacy Services</h3>
//                 <p>Convenient and reliable pharmacy services for all your medication needs.</p>
//             </div>
//             <div class="service-card">
//                 <h3>24/7 Emergency Care</h3>
//                 <p>Round-the-clock emergency medical services, ready when you need them most.</p>
//             </div>
//         </div>
//     </section>

//     <section class="contact-section">
//         <h2>Get in Touch</h2>
//         <p>Contact us today for more information about our services or to schedule an appointment.</p>
//         <p>Email: info@bahohealthcare.com</p>
//         <p>Phone: +1 (555) 123-4567</p>
//     </section>

//     <footer>
//         <p>&copy; 2025 Baho Healthcare. All rights reserved.</p>
//     </footer>

//     <script>
//         const menuIcon = document.getElementById('menu-icon');
//         const navMenu = document.getElementById('nav-menu');
//         const mobileMenu = document.getElementById('mobile-menu');

//         menuIcon.addEventListener('click', () => {
//             navMenu.classList.toggle('open');
//             mobileMenu.classList.toggle('open');
//         });
//     </script>
// </body>
// </html>



// `)})


app.use((error,req,res,next)=>{
    return res.status(500).json({Error:error.message || 'Something went wronge'})
});