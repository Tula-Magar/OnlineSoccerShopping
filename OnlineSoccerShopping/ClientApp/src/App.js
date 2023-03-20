import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css";
import UserNavMenu from "./Navigation/UserNavMenu";
import AdminNavMenu from "./Navigation/AdminNavMenu";
import Home from "./components/Home";
import GetProduct from "./components/Product/GetProduct";
import ProductDetails from "./components/Product/ProductDetails";
import ProductEdit from "./components/Product/ProductEdit";
import Create from "./components/Product/Create";
import CategoryCreate from "./components/ProductCategory/CategoryCreate";
import Login from "./components/UserAccount/LoginPage";
import Register from "./components/UserAccount/Register";

export default function App() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = cookies.token;
    setIsLoggedIn(!!token);
    try {
      const decodedToken = token ? jwt_decode(token) : null;
      setIsAdmin(decodedToken && decodedToken.role === "admin");
      setUser(decodedToken);
    } catch (error) {
      setIsAdmin(false);
    }
  }, [cookies]);

  const handleUserUpdate = () => {
    const token = cookies.token;
    setIsLoggedIn(!!token);
    try {
      const decodedToken = token ? jwt_decode(token) : null;
      setIsAdmin(decodedToken && decodedToken.role === "admin");
      setUser(decodedToken);
    } catch (error) {
      setIsAdmin(false);
    }
  };
  console.log("app", document.cookie);
  return (
    <div>
      {isAdmin ? (
        <AdminNavMenu
          isLoggedIn={isLoggedIn}
          handleUserUpdate={handleUserUpdate}
        />
      ) : (
        <UserNavMenu
          isLoggedIn={isLoggedIn}
          handleUserUpdate={handleUserUpdate}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products/:productId"
          element={<ProductDetails user={user} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/products/:productId/edit"
          element={
            isAdmin ? <ProductEdit user={user} /> : <Navigate to="/login" />
          }
        />
        <Route path="/products" element={<GetProduct isAdmin={isAdmin} />} />
        <Route
          path="/Create"
          element={isAdmin ? <Create /> : <Navigate to="/login" />}
        />
        <Route
          path="/CategoryCreate"
          element={isAdmin ? <CategoryCreate /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login handleUserUpdate={handleUserUpdate} />}
        />
        <Route
          path="/register"
          element={<Register handleUserUpdate={handleUserUpdate} />}
        />
      </Routes>
    </div>
  );
}
