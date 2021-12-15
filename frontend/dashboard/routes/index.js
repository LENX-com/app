import { lazy } from 'react'
const address = "/user/dashboard"

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const MyOrders = lazy(() => import('../pages/MyOrders'))
const Blog = lazy(() => import('../pages/Blog'))
const Wishlist = lazy(() => import('../pages/Wishlist'))
const AddNewPost = lazy(() => import('../pages/AddNewPost'))
const Profile = lazy(() => import('../pages/Profile'))
const Reviews = lazy(() => import('../pages/Reviews'))
const FAQ = lazy(() => import('../pages/FAQ'))
const SingleOrder = lazy(() => import('../pages/SingleOrder'))
const WriteReview = lazy(() => import('../pages/WriteReview'))
const SingleBlog = lazy(() => import('../pages/SingleBlog'))
const FindStatusOrder = lazy(() => import('../pages/FindStatusOrder'))
const FetchConversation = lazy(() => import('../../chat/FetchConversation'))


const routes = 
[
  {
    path: `/user/dashboard/dashboard`, // the url
    component: Dashboard, // view rendered
  },
  {
    path: `/user/dashboard/forms`,
    component: Forms,
  },
  {
    path: `/user/dashboard/cards`,
    component: Cards,
  },
  {
    path: `/user/dashboard/charts`,
    component: Charts,
  },
  {
    path: `/user/dashboard/buttons`,
    component: Buttons,
  },
  {
    path: `/user/dashboard/modals`,
    component: Modals,
  },
  {
    path: `/user/dashboard/tables`,
    component: Tables,
  },
  {
    path: `/user/dashboard/404`,
    component: Page404,
  },
  {
    path: `/user/dashboard/profile`,
    component: Profile,
  },
  {
    path: `/user/dashboard/add-post`,
    component: AddNewPost,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: `/user/dashboard/my-orders`,
    component: MyOrders,
  },
  {
    path: `/user/dashboard/blog`,
    component: Blog,
  },
  {
    path: `/user/dashboard/wishlist`,
    component: Wishlist,
  },
  {
    path: `/user/dashboard/my-reviews`,
    component: Reviews,
  },
  {
    path: `/user/dashboard/faq`,
    component: FAQ,
  },
  {
    path: `/user/dashboard/order`,
    component: SingleOrder,
  },
   {
    path: `/user/dashboard/write-review`,
    component: WriteReview,
  },
   {
    path: `/user/dashboard/blog/:id`,
    component: SingleBlog,
  },  
    {
    path: `/user/dashboard/status-order`,
    component: FindStatusOrder,
  },
      {
    path: `/user/dashboard/conversation`,
    component: FetchConversation,
  },
  
]

export default routes
