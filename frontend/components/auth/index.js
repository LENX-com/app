// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
const withAuth = (WrappedComponent) =>{
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const { user, isAuthenticated }  = useSelector( state => state.auth);
      const Router = useRouter();

      const accessToken = localStorage.getItem("token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/signin");
        return null;
      }
      
      // if user wiht role 1 tries to access normal user dasboard redirect
      if (user && user.role === 1 && /user/.test(window.location.href)) {
        Router.replace("/admin/dashboard");
        return null;
      }

      // if user wiht role 0 tries to access admin user dasboard redirect
      if (user && user.role === 0 && /admin/.test(window.location.href)) {
        Router.replace("/user/dashboard");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;