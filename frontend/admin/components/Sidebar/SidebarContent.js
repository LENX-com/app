import React from 'react'
import routes from '@/admin/routes/sidebar'
import Link from 'next/link'
import { NavLink } from '@/components/NavLink/NavLink'
import * as Icons from '@/admin/icons'
import SidebarSubmenu from '@/admin/components/Sidebar/SidebarSubmenu'
import { Button } from '@windmill/react-ui'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  return (
    <div className="py-4 text-Black text font-bold">
      <ul className="mt-6"> 
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact href={route.path}
                className="inline-flex items-center w-full text-sm text-Black-text transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName=" font-bold"
              >
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <h2 className="ml-4 text-Black-text hover:text-Black">{route.name}</h2>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default SidebarContent
