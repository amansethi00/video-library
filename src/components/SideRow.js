import React from "react";
import "./SideRow.css";
export function SideRow({title, Icon, selected}) {
  return (
    <div
      className={`pd-left-2 flex row align-items-center pd-half siderow ${
        selected && "selected"
      } `}
    >
      <Icon /> <span className="mg-left-half">{title}</span>
    </div>
  );
}
