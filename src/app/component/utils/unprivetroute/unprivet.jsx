"use cleint";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getTokenFromServer } from "../tokenvarifay/tokenApi";

const NoTokenRoute = ({ children }) => {
  const [isToken, setIsToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getTokenFromServer()
      .then((fetchedToken) => {
        if (fetchedToken) {
          setIsToken(true); // Token is present
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // If a token is present, redirect to the home page when trying to access login or signup routes
    if (
      isToken &&
      (router.pathname === "/login" || router.pathname === "/signup")
    ) {
      router.push("/home");
    }
  }, [isToken, router.pathname]);

  // If a token is present, show the children (the content of the protected route)
  if (isToken) {
    return <>{children}</>;
  } else {
    return null; // If no token is present, do not render anything
  }
};

export default NoTokenRoute;
