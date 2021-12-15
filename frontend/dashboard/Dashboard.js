import React, { Suspense, useEffect, useContext, useState, useMemo, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './components/Sidebar'
import { SidebarContext } from './context/SidebarContext'
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Route, useRouteMatch, Redirect } from 'react-router-dom'
import { Windmill } from "@windmill/react-ui";
import "./Dashboard.scss";
import "react-tabs/style/react-tabs.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/scrollbar/scrollbar.scss";

const Cards = lazy(() => import('./pages/Cards'))
const Home = lazy(() => import('./pages/Dashboard'))
// const Charts = lazy(() => import('./dashboard/pages/Charts'))
// const Buttons = lazy(() => import('./dashboard/pages/Buttons'))
// const Modals = lazy(() => import('./dashboard/pages/Modals'))
// const Tables = lazy(() => import('./dashboard/pages/Tables'))
// const Blank = lazy(() => import('./dashboard/pages/Blank'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const Blog = lazy(() => import('./pages/Blog'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
// const AddNewPost = lazy(() => import('./dashboard/pages/AddNewPost'))
const Profile = lazy(() => import('./pages/Profile'))
// const Reviews = lazy(() => import('./dashboard/pages/Reviews'))
// const FAQ = lazy(() => import('./dashboard/pages/FAQ'))
const SingleOrder = lazy(() => import('./pages/SingleOrder'))
const WriteReview = lazy(() => import('./pages/WriteReview'))
const CreateReview = lazy(() => import('./pages/CreateReview'))
// const SingleBlog = lazy(() => import('./dashboard/pages/SingleBlog'))
// const FindStatusOrder = lazy(() => import('./pages/FindStatusOrder'))
const FetchConversation = lazy(() => import('../chat/FetchConversation'))
const App = lazy(() => import('../chat/App'))

const Dashboard = ({match}) => {

  const { path } = useRouteMatch();
  
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }
    
  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  return (
    <div
      className={` dashboard flex dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
    >
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar}/>
      <div className="container mx-auto mobile:min-h-screen">
        <Route path={`${match.url}/dashboard`} component={Home} />
         <Redirect exact from= {`${path}`} to={`${path}/dashboard`} />
        <Route exact path={`${match.path}/my-orders`} component={MyOrders} />
        <Route exact path={`${match.path}/orders/:orderId`} component={SingleOrder} />
        <Route exact path={`${match.path}/wishlist`} component={Wishlist} />
        <Route exact path={`${match.path}/write-review`} component={WriteReview} />
        {/* Chat route */}
        <Route path={`${match.path}/chat`} component={App} />
        <Route path={`${match.path}/create-review/:slug`} component={CreateReview} />
        <Route path={`${match.path}/blog`} component={Blog} />
        <Route path={`${match.path}/profile`} component={Profile} />

      </div>
    </div>  

  );
};

export default Dashboard;
