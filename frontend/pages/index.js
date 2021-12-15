import React,{useState, useEffect} from 'react';
import Layout from '@/containers/Layout'
import Banner from '@/marketplace/components/banner/Banner';
import NameSlider from '@/marketplace/components/home/NameSlider';
// import StoresHome from '@/marketplace/components/home/StoresHome';
import LinkToProducts from '@/marketplace/components/home/LinkToProducts';
import HowItWorks from '@/marketplace/components/home/HowItWorks'
import BannerBotom from '@/marketplace/components/home/BannerBottom'
import { useMediaQuery } from 'react-responsive'
import { getCategories, getProducts } from '@/redux/actions/marketplace'
import { useDispatch } from 'react-redux'
import SwiperCore, {
  Navigation, Pagination
} from 'swiper';


// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const Home = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [ categories, setCategories ] = useState();
    const [ products, setProducts ] = useState();  
    const dispatch = useDispatch();

    useEffect(() => {
        
        getCategories().then( data => {
           setCategories(data) })
        
         getProducts().then( data => {
           setProducts(data) })  

        
    }, [])
    
    return (
        <Layout>
            <div className="relative"> 
                 <main className="lg:w-5/6 m-auto pb-12">
                    <Banner products = { products } isTabletOrMobile ={ isTabletOrMobile }/>

                    <HowItWorks />

                    <NameSlider categories = { categories } />

                    {/* <StoresHome /> */}
                        
                    { categories && 
                        <LinkToProducts categories = {categories} products = {products} isTabletOrMobile ={ isTabletOrMobile }/>
                    }
                    <BannerBotom /> 
                </main>
            </div>
        </Layout>
    )
};

export default Home;
