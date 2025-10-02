import React from 'react';
import Hero from '../components/Hero';
import WhyLearnWithUs from '../components/WhyLearnWithUs';
import HowItWorks from '../components/HowItWorks';
import ResourceHub from '../components/ResourceHub';
import QuizSection from '../components/QuizSection';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyLearnWithUs />
      <HowItWorks />
      <ResourceHub />
      <QuizSection />
      {/* <Testimonials /> */}
      <FinalCTA />
    </>
  );
};

export default HomePage;