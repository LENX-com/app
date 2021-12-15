import React from 'react'
import Layout from '@/containers/Layout'
import SidebarContent from '@/dashboard/components/Sidebar/SidebarContent'

const NavBar = ({children}) => {
    const BarStyle = {
        position: "fixed",
        top: "64px",
        left: "0px",
        height: "100vh",
        width: "225px",
        background: "white",
        paddingTop: "1rem",
        overflow: "auto",
        paddingBottom: "1.5rem",
        transition: "all 0.3s ease 0s",
        zIndex: "2",
    }
  return (
    <Layout>
      <div className="lg:grid lg:grid-cols-8">
        <div className="lg:col-span-2">
          <div  style={BarStyle} className="overflow-y-scroll pb-3">
            <SidebarContent />
          </div>
        </div>
        <div className="lg:col-span-5">
            {children}
        </div>
      </div>      
    </Layout>
  )
}

export default NavBar
