import React, { useEffect } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Logout({ handleUserUpdate }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token");
  };

  useEffect(() => {
    handleUserUpdate();
  }, [cookies]);

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
