import React, { useState, useEffect } from "react";
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
import Cookies from "js-cookie";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleUserUpdate = () => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
    try {
      const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
      setIsAdmin(user && user.role === "admin");
      setUserEmail(user && user.Email);
    } catch (error) {
      setIsAdmin(false);
    }
  };

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
          element={
            <ProductDetails userEmail={userEmail} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/products/:productId/edit"
          element={
            isAdmin ? (
              <ProductEdit userEmail={userEmail} />
            ) : (
              <Navigate to="/login" />
            )
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
