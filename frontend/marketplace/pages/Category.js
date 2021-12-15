import React, { useState, useEffect } from "react";
import CategoryProduct from '../components/product/CategoryProduct'
import { getFilteredProducts } from "../components/ApiCore";
import { getCategories} from "../../actions/categoryAction";
import {  fetchProductsByFilter, getProductsByCount, getProductByCategory } from "../../actions/productAction";
import { getSubs, getSubByCategory } from "../../actions/subCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import "../components/shop/Shop.scss";
import { useMediaQuery } from 'react-responsive'
import CategoryPop from '../components/category/CategoryPop'
import PopularSearch from "../components/category/PopularSearch";
import FilterDialogue from '../components/category/FilterDialogue'
import CategoryBanner from '../components/banner/CategoryBanner'
import NavBar from '../components/navBar/NavBar'
import Card from '../../components/Cards/Card'
import PopularStores from '../../marketplace/components/home/PopularStores';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NoProduct } from '../assets/icons'


const Shop = (props) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const dispatch = useDispatch();


  const categories = useSelector((state) => state.categories);

  const {productsByCategory} = useSelector((state) => state.product);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [ menu, setMenu ] = useState("")
   const [products, setProducts] = useState(productsByCategory);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([1, 200]);
  const [ok, setOk] = useState(false);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [ category, setCategory ] = useState(false);
  const [ categoryName, setCategoryName ] = useState("")
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

 let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    // fetch categories
    dispatch(getProductByCategory(props.match.params.categoryId));
     dispatch(getCategories());
     setCategory(props.match.params.categoryId)
     // fetch subcategories
    }, []);
    
    
  useEffect(() => {
    // fetch categories
     setProducts(productsByCategory);
     // fetch subcategories
    }, [productsByCategory]);
    

  //   useEffect(() => {
  //     if(category) {
  //   getSubByCategory(category).then((res) => setSubs(res.data));
  //   fetchProducts({ category });
  //     }
  // }, [category]);

 


  return (

      <div className="lg:w-5/6 m-auto mb-6 my-6">
        hey
      </div>

  );
};

export default Shop;

