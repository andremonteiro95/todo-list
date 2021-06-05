// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Redirect, Route, RouteProps } from 'react-router-dom'

// export const PublicRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated } = useSelector(getAuth)

//   return (
//     <Route
//       render={(props) =>
//         isAuthenticated === false ? <Component {...props} /> : <Redirect to="/app" />
//       }
//       {...rest}
//     />
//   )
// }
