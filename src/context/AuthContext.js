import React, { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
};



const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
        console.log("Token saved:", action.payload.token);
      } else {
        console.error("No token provided!");
      }
      console.log("Before setting to context role is : " + action.payload.role); 
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        role: action.payload.role,
        token: action.payload.token,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (role, token) => {
    console.log("Login function called with role:", role, "and token:", token);
    dispatch({ type: "LOGIN", payload: { role, token } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
