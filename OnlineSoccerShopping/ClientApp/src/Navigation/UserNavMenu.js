import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { useCookies } from "react-cookie";
import Logout from "../components/UserAccount/Logout";

const UserNavMenu = ({ cartItemCount, isLoggedIn, handleUserUpdate }) => {
  const [collapsed, setCollapsed] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies(["token"]);

  // useEffect(() => {
  //   setIsLoggedIn(!!cookies.token);
  // }, [cookies]);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm bg-dark mb-3 pt-3 pb-3 "
        container
        light
      >
        <NavbarBrand tag={Link} className="text-white" to="/">
          OnlineSoccerShopping
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
          <Nav className=" flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-white" to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-white" to="/products">
                Product List
              </NavLink>
            </NavItem>

            {isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/cart">
                    Cart
                    <Badge color="secondary">{cartItemCount}</Badge>
                  </NavLink>
                </NavItem>

                <Logout handleUserUpdate={handleUserUpdate} />
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/register">
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
