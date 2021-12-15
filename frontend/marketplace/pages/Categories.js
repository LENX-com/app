import React, {useEffect } from 'react'
import CategoriesList from '../components/Categories/CategoriesList'
import PopularStores from '../components/home/PopularStores'
import PopularProduct from '../components/product/PopularProduct'
import PopularSearches from '../components/Categories/PopularSearches'
import {getCategories} from "../../actions/categoryAction";
import {getProductsByArrival} from "../../actions/productAction"
import {useDispatch, useSelector} from "react-redux"
import Banner from '../components/banner/Banner'


const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories)
    // const productList = useSelector(state => state.product.productsByArrival)

    //changed the api to dispatch actions to redux
    useEffect(() => {
        dispatch(getCategories())
        // dispatch(getProductsByArrival("createdAt"))
    }, [dispatch])

    return (
        <>  
            <CategoriesList categories= {categories} />
        </>
    )
}

export default Categories
  