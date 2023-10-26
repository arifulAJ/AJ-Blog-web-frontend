"use cleint";
import React, { useEffect, useState } from "react";
import { getTokenFromServer } from "../tokenvarifay/tokenApi";
import { useRouter } from "next/navigation";

const withNoTokenRoute = (WrappedComponent) => {
  return function NoTokenRouteWrapper(props) {
    const [isToken, setIsToken] = useState(false);
    const router = useRouter();

    useEffect(() => {
      getTokenFromServer()
        .then((fetchedToken) => {
          if (fetchedToken) {
            setIsToken(true); // Token is present
            router.push("/home");
          } else {
            // If no token is present, navigate to the login page
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    // If a token is present, show the protected content
    if (!isToken) {
      return <WrappedComponent {...props} />;
    }

    // You can also show a loading spinner or a message here while checking the token
    return <h1>loadding..............</h1>;
  };
};

export default withNoTokenRoute;
