import React from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx'
import Home from '../Components/Home/Home.jsx';
import Features from './features/Features.jsx';
import WhyChooseUs from './Why/WHychooseus.jsx';
import Team from './team/team.jsx';
import Contact from './contact/Contact.jsx';
import Footer from './footer/footer.jsx';

function Landingpage() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Features/>
      <WhyChooseUs/>
      <Team/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Landingpage
