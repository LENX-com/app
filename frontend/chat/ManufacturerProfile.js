import { Menu, Transition} from '@headlessui/react'
import { AiOutlineSmallDash, AiOutlineShoppingCart, AiOutlineProfile , AiOutlineDown, AiOutlineGift} from 'react-icons/ai'
import { useRef, useEffect, Fragment } from 'react'
import { AiOutlineUser, AiOutlineStar, AiOutlineDelete } from 'react-icons/ai'
import Link from 'next/link'
import { Menu as MenuIcon} from '../marketplace/assets/icons'

const solutions = [
  {
    name: 'Products',
    description: 'Measure actions your users take',
    href: '##',
    icon: AiOutlineShoppingCart,
  },
  {
    name: 'Company Profile',
    description: 'Create your own targeted content',
    href: '##',
    icon: AiOutlineProfile,
  },
]


 const ManufacturerProfile = ({user}) => {
     
const chatBodyRef= useRef(0)

//  useEffect(() => {
//     chatBodyRef.current.focus();
//   }, []);
    
 return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-full px-2 py-1 text-sm font-medium text-Black-text">
            <MenuIcon
              className="w-4 h-4 text-Black-text hover:text-Blue"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/marketplace/manufacturer/${user.slug}`}>
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-Blue' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <AiOutlineUser
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <AiOutlineUser
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Visit Profile
                  </button>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/user/dashboard/create-review/22`}>
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-Blue' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <AiOutlineStar
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                      ) : (
                        <AiOutlineStar
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                      )}
                      Leave Review
                    </button>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/user/dashboard/orders/${user.slug}`}>
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-Blue' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <AiOutlineGift
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                      ) : (
                        <AiOutlineGift
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                      )}
                      Orders
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-Blue' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <AiOutlineDelete
                        className="w-4 h-4 mr-2 text-Blue"
                        aria-hidden="true"
                      />
                    ) : (
                      <AiOutlineDelete
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ManufacturerProfile

