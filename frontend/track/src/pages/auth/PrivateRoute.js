// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { auth } from "../../firebase";

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         auth.currentUser ? (
//           <Component {...props} />
//         ) : rest.path === "/login" ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// }

// export default PrivateRoute;

import React from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state}))

    return user && user.token ? (<Route {...rest}/>) :
        (<LoadingToRedirect/>)

        }


export default UserRoute
