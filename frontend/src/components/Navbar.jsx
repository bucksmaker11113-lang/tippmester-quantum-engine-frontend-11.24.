import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Tippmester Quantum Engine</div>
      <div className="navbar-menu">
        <span>Tippek</span>
        <span>Live</span>
        <span>Kombi</span>
        <span>Chat</span>
      </div>
    </nav>
  );
}
