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
    <>
      <NavItem>
        <NavLink
          tag={Link}
          className="text-white"
          to="/"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      </NavItem>
    </>
  );
}

export default Logout;
