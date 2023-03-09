import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Cookies from "js-cookie";
import Logout from "./Logout";

const UserNavMenu = ({ handleUserUpdate }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [Cookies.get("token")]);

  console.log("isLoggedIn", isLoggedIn);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 nav"
        container
        light
      >
        <NavbarBrand tag={Link} to="/">
          OnlineSoccerShopping
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
          <Nav className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/products">
                Product List
              </NavLink>
            </NavItem>
            {isLoggedIn ? (
              <NavItem>
                <Logout handleUserUpdate={handleUserUpdate} />
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default UserNavMenu;
