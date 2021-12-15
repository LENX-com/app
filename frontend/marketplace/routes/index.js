import { lazy } from "react";

const address = "/marketplace";

const Categories = lazy(() => import("../pages/Categories"));
const Category = lazy(() => import("../pages/Category"));
const Product = lazy(() => import("../pages/Product"));
const ProductReview = lazy(() => import("../pages/ProductReview"));
const Stores = lazy(() => import("../pages/Stores"));
const Manufacturer = lazy(() => import("../pages/Manufacturer"));
const Blog = lazy(() => import("../../components/Blog/Blog"));
const Search = lazy(() => import("../pages/SearchResult"));
const Questions = lazy(() => import('../pages/Questions'))
const Basket = lazy(() => import('../pages/Basket'))
const Checkout = lazy(() => import('../components/checkout/Checkout'))
const Marketplace = lazy(() => import('../pages/Marketplace'))
const SingleBlog = lazy(() => import('../pages/SingleBlog'))


const routes = [
  {
    path: `${address}/categories`, // the url
    component: Categories, // view rendered
  },
  {
    path: `${address}/search`, // the url
    component: Search, // view rendered
    
  },
  {
    path: `${address}/category/:categoryId`,
    component: Category,
  },
  {
    path: `${address}`,
    component: Marketplace,
  },
  {
    path: `${address}/products/:productSlug`,
    component: Product,
  },  
  { path: `${address}/products/reviews/:productId`, 
    component: ProductReview, 
  },
  {
    path: `${address}/category/products/reviews/:productId`,
    component: ProductReview,
  },
  {
    path: `${address}/manufacturer/:manufacturerSlug`,
    component: Manufacturer,
  },
  {
    path: `${address}/manufacturer/blog/:BlogId`,
    component: Blog,
  },
  {
    path: `${address}/stores`,
    component: Stores,
  },
  {
    path: `${address}/questions/:productId`, 
    component: Questions, 
  },
  {
    path: `${address}/checkout`, 
    component: Checkout, 
  },
  {
    path: `${address}/basket`, 
    component: Basket, 
  },
  {
    path: `${address}/blog/:blogId`, 
    component: SingleBlog, 
  }
];
export default routes;
