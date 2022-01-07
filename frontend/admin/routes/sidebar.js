const address = "/admin/dashboard"
const routes = [
  {
    path: `${address}`, // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: `${address}/orders`,
    icon: 'TablesIcon',
    name: 'My orders',
  },
  {
    path: `${address}/chat`,
    icon: 'FormsIcon',
    name: 'Chat',
  },
  {
    path: `${address}/reviews`,
    icon: 'FormsIcon',
    name: 'Reviews',
  },
  {
    path: `${address}/services`,
    icon: 'FormsIcon',
    name: 'Services',
  },
  // {
  //   path: `${address}/blogs`,
  //   icon: 'FormsIcon',
  //   name: 'Blogs',
  // },
]

export default routes
