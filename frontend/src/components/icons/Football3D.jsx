import React from "react";
import "./Icons3D.css";

/*
  Egyszerű 3D-s focilabda ikon.
  CSS transform + hover animációval.
*/

export default function Football3D() {
  return (
    <div className="icon-3d football-icon">
      <div className="ball"></div>
      <span className="label">Foci</span>
    </div>
  );
}
