import React, { useState } from "react";
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
import Logout from "../components/UserAccount/Logout";

const AdminNavMenu = ({ handleUserUpdate }) => {
  const [collapsed, setCollapsed] = useState(true);

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

            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/Create">
                Product
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/CategoryCreate">
                Category
              </NavLink>
            </NavItem>
            <NavItem>
              <NavItem>
                <Logout handleUserUpdate={handleUserUpdate} />
              </NavItem>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default AdminNavMenu;
