// Hová kerül: frontend/src/components/icons/SportIcons3D.jsx

import React from "react";
import "./SportIcons3D.css";

/*
  Több sportág 3D-s ikonja egy gridben.
*/

export default function SportIcons3D() {
  const icons = [
    { label: "Foci", className: "sport-icon football" },
    { label: "Kosár", className: "sport-icon basketball" },
    { label: "Tenisz", className: "sport-icon tennis" },
    { label: "Kézi", className: "sport-icon handball" }
  ];

  return (
    <div className="sport-icons-3d-grid">
      {icons.map((icon, i) => (
        <div className={icon.className} key={i}>
          <div className="icon-shape" />
          <span className="label">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}