import React from "react";
import Footer from "../../Shared/Footer/Footer";

import Navigation from "../../Shared/Navigation/Navigation";
import AppoinmentBanner from "../AppoinmentBanner/AppoinmentBanner";
import CareSection from "../CareSection/CareSection";
import ConnectWithUs from "../ConnectWithUS/ConnectWithUs";
import ContactCard from "../ContactCard/ContactCard";
import Doctors from "../Doctors/Doctors";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Hero></Hero>
      <ContactCard></ContactCard>
      <Services></Services>
      {/* <CareSection></CareSection> */}
      <AppoinmentBanner></AppoinmentBanner>
      <Doctors></Doctors>
      <ConnectWithUs></ConnectWithUs>
      <Footer></Footer>
    </div>
  );
};

export default Home;
