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

const Home = lazy(() => import('./pages/Dashboard'))
const Orders = lazy(() => import('./pages/Orders'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Profile = lazy(() => import('./pages/Profile'))
const SingleOrder = lazy(() => import('./pages/SingleOrder'))
const FetchConversation = lazy(() => import('../chat/FetchConversation'))
const App = lazy(() => import('../chat/App'))
const Products = lazy(() => import('./pages/Products'))
const AddProduct = lazy(() => import('./pages/AddProduct'))
const EditProduct = lazy(() => import('./pages/EditProduct'))
const Blog = lazy(() => import('./pages/Blog'))
const AddBlog = lazy(() => import('./pages/AddBlog'))
const EditBlog = lazy(() => import('./pages/EditBlog'))

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
        <Route path={`${match.path}/chat`} component={App} />
        <Route path={`${match.path}/profile`} component={Profile} />
        <Route path={`${match.path}/reviews`} component={Reviews} />
        <Route exact path={`${match.path}/products`} component={Products} />
        <Route exact path={`${match.path}/products/add-product`} component={AddProduct} />
        <Route exact path={`${match.path}/products/edit/:productSlug`} component={EditProduct} />
        <Route exact path={`${match.path}/blogs`} component={Blog} />
        <Route exact path={`${match.path}/blogs/add-blog/`} component={AddBlog} />
        <Route exact path={`${match.path}/blogs/edit/:blogId`} component={EditBlog} />



      </div>
    </div>  

  );
};

export default Dashboard;
