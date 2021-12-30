const address = "/user/dashboard"
const routes = [
  {
    path: `${address}`, // the url
    icon: 'Home', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: `${address}/my-orders`,
    icon: 'Order',
    name: 'My orders',
  },
  {
    path: `${address}/chat`,
    icon: 'ChatIcon',
    name: 'Chat',
  },
  // {
  //   path: `${address}/blog`,
  //   icon: 'Blog',
  //   name: 'Blogs',
  // },
  {
    path: `${address}/wishlist`,
    icon: 'Wishlist',
    name: 'Wishlist',
  },
]

export default routes
      