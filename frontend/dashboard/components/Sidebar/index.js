import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

function Sidebar({ isSidebarOpen, closeSidebar }) {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </>
  )
}

export default Sidebar
