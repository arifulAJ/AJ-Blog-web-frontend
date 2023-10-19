// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getTokenFromServer } from "./component/utils/tokenvarifay/tokenApi";

// if i need to add  context api i can use this

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
