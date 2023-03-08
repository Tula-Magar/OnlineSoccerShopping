import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css";

import NavMenu from "./components/NavMenu";

import Home from "./components/Home";

import GetProduct from "./components/Product/GetProduct";
import ProductDetails from "./components/Product/ProductDetails";
import ProductEdit from "./components/Product/ProductEdit";
import Create from "./components/Product/Create";

import CategoryCreate from "./components/ProductCategory/CategoryCreate";

import Login from "./components/UserAccount/LoginPage";
import Register from "./components/UserAccount/Register";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/:productId/edit" element={<ProductEdit />} />
          <Route path="/products" element={<GetProduct />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/CategoryCreate" element={<CategoryCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }
}
