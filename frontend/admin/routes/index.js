import { lazy } from 'react'
const address = "/admin/dashboard"

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const Orders = lazy(() => import('../pages/Orders'))
const Profile = lazy(() => import('../pages/Profile'))
const Reviews = lazy(() => import('../pages/Reviews'))
const FAQ = lazy(() => import('../pages/FAQ'))
const SingleOrder = lazy(() => import('../pages/SingleOrder'))
const SingleBlog = lazy(() => import('../pages/SingleBlog'))
const FindStatusOrder = lazy(() => import('../pages/FindStatusOrder'))
const FetchConversation = lazy(() => import('../../chat/FetchConversation'))
const Products = lazy(() => import('../pages/Products'))
const AddProduct = lazy(() => import('../pages/AddProduct'))
const EditProduct = lazy(() => import('../pages/EditProduct'))
const Blog = lazy(() => import('../pages/Blog'))
const AddBlog = lazy(() => import('../pages/AddBlog'))
const EditBlog = lazy(() => import('../pages/EditBlog'))


const routes = 
[
  {
    path: `${address}/dashboard`, // the url
    component: Dashboard, // view rendered
  },
  {
    path: `${address}/forms`,
    component: Forms,
  },
  {
    path: `${address}/cards`,
    component: Cards,
  },
  {
    path: `${address}/charts`,
    component: Charts,
  },
  {
    path: `${address}/404`,
    component: Page404,
  },
  {
    path: `${address}/profile`,
    component: Profile,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: `${address}/orders`,
    component: Orders,
  },
  {
    path: `${address}/blog`,
    component: Blog,
  },
  {
    path: `${address}/reviews`,
    component: Reviews,
  },
  {
    path: `${address}/faq`,
    component: FAQ,
  },
  {
    path: `${address}/order/:orderId`,
    component: SingleOrder,
  },
   {
    path: `${address}/blog/:id`,
    component: SingleBlog,
  },  
      {
    path: `${address}/conversation`,
    component: FetchConversation,
  },
  {
    path: `${address}/products`,
    component: Products,
  },
  {
    path: `${address}/products/add-product`,
    component: AddProduct,
  },
  {
    path: `${address}/products/edit/:productSlug`,
    component: EditProduct,
  },
    {
    path: `${address}/blogs/`,
    component: Blog,
  },
  {
    path: `${address}/blogs/add-blog/`,
    component: AddBlog,
  },
  {
    path: `${address}/blogs/edit/:blogId`,
    component: EditBlog,
  },
  
]

export default routes
