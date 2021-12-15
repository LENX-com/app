import React from 'react'

import SidebarContent from './SidebarContent'

function DesktopSidebar(props) {
  return (
    <aside className="w-64 flex-shrink-0 hidden overflow-y-auto bg-white dark:bg-gray-800 lg:block min-h-screen">
      <SidebarContent />
    </aside>
  )
}

export default DesktopSidebar
