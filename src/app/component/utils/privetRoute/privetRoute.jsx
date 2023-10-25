import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
            router.push("/login"); // Token is not present, navigate to the login page
          }
        })
        .catch((error) => {
          console.error(error);
          router.push("/error"); // Handle errors appropriately
        });
    }, [router]);

    if (isToken) {
      return <WrappedComponent {...props} />; // Render the protected content if the token is present
    } else {
      // You can also show a loading spinner or a message here while checking the token
      return null;
    }
  };
};

export default withPrivateRoute;
