import React, {useEffect } from 'react'
import CategoriesList from '@/marketplace/components/Categories/CategoriesList'
import {getCategories} from "@/redux/actions/categoryAction";
import Layout from '@/containers/Layout'
import {useDispatch, useSelector} from "react-redux"


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
        <Layout>  
            <CategoriesList categories= {categories} />
        </Layout>
    )
}

export default Categories
  