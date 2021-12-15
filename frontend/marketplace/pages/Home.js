import React, {useState, useEffect} from 'react'
import Banner from '../components/banner/Banner';
import NameSlider from '../components/home/NameSlider';
import Section from '../../components/section/Section'
import LinkFeatures from '../components/home/LinkFeatures';
import PopularItems from '../components/home/PopularItems';

const Home = () => {

    return ( 
         <>

            <Section>
                <NameSlider />
            </Section>
            
                <Banner />
            
            <Section>
                <LinkFeatures />  
            </Section>

             <Section>
                <PopularItems />  
            </Section>
            
         </>
    )
};

export default Home;
