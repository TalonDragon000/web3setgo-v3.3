import React from 'react';
import Hero from '../components/Hero';
import WhyLearnWithUs from '../components/WhyLearnWithUs';
import HowItWorks from '../components/HowItWorks';
import SimulationsSection from '../components/SimulationsSection';
import ResourceHub from '../components/ResourceHub';
import QuizSection from '../components/QuizSection';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyLearnWithUs />
      {/*<HowItWorks />*/}
      <SimulationsSection />
      <ResourceHub />
      <QuizSection />
      {/* <Testimonials /> */}
      <FinalCTA />
    </>
  );
};

export default HomePage;