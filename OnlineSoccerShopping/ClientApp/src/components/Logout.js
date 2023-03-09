import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout({ handleUserUpdate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    handleUserUpdate();
    navigate("/");
  };

  return (
    <ul className="unstyled-list">
      <NavItem>
        <NavLink tag={Link} className="text-dark" to="/" onClick={handleLogout}>
          Logout
        </NavLink>
      </NavItem>
    </ul>
  );
}

export default Logout;
