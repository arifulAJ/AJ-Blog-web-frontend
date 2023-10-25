// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getTokenFromServer } from "./component/utils/tokenvarifay/tokenApi";

// // if i need to add  context api i can use this

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(null);

//   const login = (newToken) => {
//     setToken(newToken);
//   };

//   const logout = () => {
//     setToken(null);
//   };

//   useEffect(() => {
//     // Fetch the token when the component mounts
//     async function checkToken() {
//       try {
//         const token = await getTokenFromServer();
//         login(token);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         // setLoading(false);
//       }
//     }

//     checkToken();
//   }, []);
//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === "/login" || path === "/signup";
//   const token = request.cookies.get("token")?.value || "";
//   console.log(request.cookies);
//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
//   // if (path != "/login") {
//   //   return NextResponse.redirect(new URL("/login", request.nextUrl));
//   // }
//   // Set a flag in the request object
//   request.showProfilePopup = !isPublicPath && !!token;

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
//   console.log(token, isPublicPath, path);
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/signup",
//     "/article",
//     "/articleCreate",
//     "/profilePopUp",
//     "/profile",
//   ],
// };
