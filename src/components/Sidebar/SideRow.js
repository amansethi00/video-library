import React from "react";
import "./SideRow.css";
import {NavLink} from "react-router-dom";
let activeStyle = {
  textDecoration: "none",
  color: "white",
  backgroundColor: "var(--sidebar-hover-color) ",
};
export const SideRow = ({title, Icon, to}) => {
  return (
    <NavLink
      end
      className={`mg-left-2 btn-secondary-md flex row align-items-center siderow`}
      to={to}
      activeStyle={activeStyle}
    >
      <Icon /> <span className="mg-left-half">{title}</span>
    </NavLink>
  );
};
