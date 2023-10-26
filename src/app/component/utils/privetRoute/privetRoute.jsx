// "use client";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { getTokenFromServer } from "../tokenvarifay/tokenApi";
// import Link from "next/link";
// import LoginPage from "../../../login/page";

// const withPrivateRoute = (WrappedComponent) => {
//   return function PrivateRouteWrapper(props) {
//     const [isToken, setIsToken] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//       getTokenFromServer()
//         .then((fetchedToken) => {
//           if (fetchedToken) {
//             setIsToken(true); // Token is present
//           } else {
//             router.push("/login"); // Token is not present, navigate to the login page
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//           // router.push("/login"); // Handle errors appropriately
//         });
//     }, [router]);

//     if (isToken) {
//       return <WrappedComponent {...props} />; // Render the protected content if the token is present
//     } else {
//       // You can also show a loading spinner or a message here while checking the token
//       return router.push("/login");
//     }
//   };
// };

// export default withPrivateRoute;

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getTokenFromServer } from "../tokenvarifay/tokenApi";
import Link from "next/link";
import LoginPage from "../../../login/page";

const withPrivateRoute = (WrappedComponent) => {
  return function PrivateRouteWrapper(props) {
    const [isToken, setIsToken] = useState(false);
    const router = useRouter();

    useEffect(() => {
      getTokenFromServer()
        .then((fetchedToken) => {
          if (fetchedToken) {
            setIsToken(true); // Token is present
          } else {
            if (typeof window !== "undefined") {
              router.push("/login"); // Client-side navigation
            }
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle errors appropriately
        });
    }, [router]);

    if (isToken) {
      return <WrappedComponent {...props} />; // Render the protected content if the token is present
    } else {
      // You can also show a loading spinner or a message here while checking the token
      if (typeof window !== "undefined") {
        router.push("/login"); // Client-side navigation
      }
      return null; // or any other placeholder component
    }
  };
};

export default withPrivateRoute;
