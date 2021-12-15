import React from 'react'
import routes from '@/dashboard/routes/sidebar'
import Link from 'next/link'
import { NavLink } from '@/components/NavLink/NavLink'
import * as Icons from '@/marketplace/assets/icons'
import SidebarSubmenu from '@/dashboard/components/Sidebar/SidebarSubmenu'
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
                {/* <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg"
                    style={{"background":"#ff5722"}}
                    aria-hidden="true"
                  ></span>
                </Route> */}
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <h2 className="ml-4 text-Black-text hover:text-Black">{route.name}</h2>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Link href="/marketplace">
          <Button className="link-marketplace">
            Explore Marketplace
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SidebarContent
