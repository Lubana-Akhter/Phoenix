import React from 'react';
import PageTop from '../components/PageTop';
import Banner from '../components/Banner';
import About from '../components/About';
import Property from '../components/Property';
import Testimonial from '../components/Testimonial';

const HomePage = () => {
    const propertyHeading = { title1: 'Our Handpicks ', title2: 'For You'};

    return (
        <>
            <PageTop />
            <Banner />
            <About />
            <Property propertyTitle={propertyHeading}/>
            <Testimonial />
        </>
    );
};

export default HomePage;